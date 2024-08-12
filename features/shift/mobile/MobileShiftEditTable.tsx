'use client';

import React from 'react';

import { Box, Flex, Text, Button, Divider } from '@chakra-ui/react';
import { format, setDate } from 'date-fns';
import { ja } from 'date-fns/locale';
import Select from 'react-select';

import { ShiftModal } from '../components/ShiftModal';
import { useShiftManagement } from '../hooks/useShiftManagement';
import { ShiftTableProps } from '../types';

export default function MobileShiftEditTable({
  users,
  year,
  month,
}: ShiftTableProps) {
  const {
    selectedShift,
    editedShift,
    setEditedShift,
    handleDelete,
    handleUpdate,
    handleAddShift,
    openAddModal,
    openEditModal,
    isOpen,
    onClose,
  } = useShiftManagement();

  const daysInMonth = new Date(year, month, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const [selectedDay, setSelectedDay] = React.useState(days[0]);
  const [selectedUser, setSelectedUser] = React.useState(users[0]?.id);

  function formatTime(date: Date | string) {
    const dateObject = typeof date === 'string' ? new Date(date) : date;
    return format(dateObject, 'HH:mm', { locale: ja });
  }

  const dayOptions = days.map((day) => ({
    value: day,
    label: format(setDate(new Date(year, month - 1), day), 'M/d(E)', {
      locale: ja,
    }),
  }));

  const userOptions = users.map((user) => ({
    value: user.id,
    label: user.name,
  }));

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderColor: 'rgba(255, 255, 255, 0.3)',
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: 'white',
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isFocused
        ? 'rgba(255, 255, 255, 0.2)'
        : 'transparent',
      color: 'white',
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: 'rgba(45, 55, 72, 0.9)',
    }),
  };

  return (
    <Flex direction="column" gap={4}>
      <Flex gap={2}>
        <Select
          options={dayOptions}
          value={dayOptions.find((option) => option.value === selectedDay)}
          onChange={(option) => setSelectedDay(option?.value || days[0])}
          styles={customStyles}
        />
        <Select
          options={userOptions}
          value={userOptions.find((option) => option.value === selectedUser)}
          onChange={(option) => setSelectedUser(option?.value || users[0]?.id)}
          styles={customStyles}
        />
      </Flex>
      <Button onClick={() => openAddModal(selectedUser)}>シフト追加</Button>
      <Divider />
      <Flex direction="column" gap={4}>
        {users.map((user) => {
          const shift = user.shifts.find((s) => {
            const shiftDate = new Date(s.startTime);
            const currentDate = new Date(year, month - 1, selectedDay);
            return (
              shiftDate.getDate() === currentDate.getDate() &&
              shiftDate.getMonth() === currentDate.getMonth() &&
              shiftDate.getFullYear() === currentDate.getFullYear()
            );
          });

          if (user.id !== selectedUser) return null;

          return (
            <Box key={user.id} p={2} borderWidth={1} borderRadius="md">
              <Text fontWeight="bold">{user.name}</Text>
              {shift ? (
                <Flex direction="column" gap={2} mt={2}>
                  <Text>
                    {formatTime(shift.startTime)} - {formatTime(shift.endTime)}
                  </Text>
                  <Flex gap={2}>
                    <Button size="sm" onClick={() => handleDelete(shift.id)}>
                      削除
                    </Button>
                    <Button size="sm" onClick={() => openEditModal(shift)}>
                      編集
                    </Button>
                  </Flex>
                </Flex>
              ) : (
                <Text>シフトなし</Text>
              )}
            </Box>
          );
        })}
      </Flex>
      <ShiftModal
        isOpen={isOpen}
        onClose={onClose}
        editedShift={editedShift}
        setEditedShift={setEditedShift}
        onSubmit={selectedShift?.id ? handleUpdate : handleAddShift}
        headerText={selectedShift?.id ? 'シフト編集' : 'シフト追加'}
        submitButtonText={selectedShift?.id ? '更新' : '追加'}
      />
    </Flex>
  );
}
