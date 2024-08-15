'use client';

import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Flex,
  IconButton,
} from '@chakra-ui/react';
import { format, setDate } from 'date-fns';
import { ja } from 'date-fns/locale';
import { MdAdd, MdEdit, MdDelete } from 'react-icons/md';

import { useShiftManagement } from '../hooks/useShiftManagement';
import { ShiftTableProps } from '../types';
import { ShiftModal } from '../components/ShiftModal';

export default function MobileLandscapeShiftTable({
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

  function formatTime(date: Date | string) {
    const dateObject = typeof date === 'string' ? new Date(date) : date;
    return format(dateObject, 'HH:mm', { locale: ja });
  }

  return (
    <Box overflowX="auto" maxHeight="100vh">
      <Table size="sm">
        <Thead>
          <Tr>
            <Th color={'gray.200'}>日付</Th>
            {users.map((user) => (
              <Th key={user.id}>
                <Flex direction="column" align="center">
                  <Box>{user.name}</Box>
                  <IconButton
                    aria-label="Add shift"
                    icon={<MdAdd />}
                    size="xs"
                    onClick={() => openAddModal(user.id)}
                    mt={1}
                  />
                </Flex>
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {days.map((day) => (
            <Tr key={day}>
              <Td>
                {format(setDate(new Date(year, month - 1), day), 'M/d(E)', {
                  locale: ja,
                })}
              </Td>
              {users.map((user) => {
                const shift = user.shifts.find((s) => {
                  const shiftDate = new Date(s.startTime);
                  const currentDate = new Date(year, month - 1, day);
                  return (
                    shiftDate.getDate() === currentDate.getDate() &&
                    shiftDate.getMonth() === currentDate.getMonth() &&
                    shiftDate.getFullYear() === currentDate.getFullYear()
                  );
                });
                return (
                  <Td key={user.id}>
                    {shift ? (
                      <Flex direction="column" align="center">
                        <Box fontSize="xs">
                          {formatTime(shift.startTime)} -{' '}
                          {formatTime(shift.endTime)}
                        </Box>
                        <Flex mt={1}>
                          <IconButton
                            aria-label="Delete shift"
                            icon={<MdDelete />}
                            size="xs"
                            onClick={() => handleDelete(shift.id)}
                            mr={1}
                          />
                          <IconButton
                            aria-label="Edit shift"
                            icon={<MdEdit />}
                            size="xs"
                            onClick={() => openEditModal(shift)}
                          />
                        </Flex>
                      </Flex>
                    ) : (
                      '-'
                    )}
                  </Td>
                );
              })}
            </Tr>
          ))}
        </Tbody>
      </Table>
      <ShiftModal
        isOpen={isOpen}
        onClose={onClose}
        editedShift={editedShift}
        setEditedShift={setEditedShift}
        onSubmit={selectedShift?.id ? handleUpdate : handleAddShift}
        headerText={selectedShift?.id ? 'シフト編集' : 'シフト追加'}
        submitButtonText={selectedShift?.id ? '更新' : '追加'}
      />
    </Box>
  );
}
