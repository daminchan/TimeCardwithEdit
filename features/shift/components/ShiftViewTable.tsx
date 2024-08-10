'use client';

import { useState } from 'react';

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Switch,
  Flex,
  Text,
} from '@chakra-ui/react';
import { format, setDate, startOfDay } from 'date-fns';
import { ja } from 'date-fns/locale';

import { ShiftTableProps, Shift } from '../types';

export default function ShiftViewTable({
  users,
  year,
  month,
  currentUserId,
}: ShiftTableProps & { currentUserId?: string }) {
  const [showAllUsers, setShowAllUsers] = useState(false);

  const daysInMonth = new Date(year, month, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  function formatTime(date: Date | string) {
    const dateObject = typeof date === 'string' ? new Date(date) : date;
    return format(dateObject, 'HH:mm', { locale: ja });
  }

  const filteredUsers = showAllUsers
    ? users
    : users.filter((user) => user.id === currentUserId);

  return (
    <Box overflowX="auto">
      <Flex justifyContent="flex-end" mb={4}>
        <Flex alignItems="center">
          <Switch
            id="show-all-users"
            isChecked={showAllUsers}
            onChange={(e) => setShowAllUsers(e.target.checked)}
            mr={2}
          />
          <Text>全員のシフトを表示</Text>
        </Flex>
      </Flex>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>日付</Th>
            {filteredUsers.map((user) => (
              <Th key={user.id}>{user.name}</Th>
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
              {filteredUsers.map((user) => {
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
                      <Box>
                        {formatTime(shift.startTime)} -{' '}
                        {formatTime(shift.endTime)}
                      </Box>
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
    </Box>
  );
}
