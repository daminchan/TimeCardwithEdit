'use client';

import { useState } from 'react';

import {
  Box,
  Switch,
  Flex,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  useColorModeValue,
} from '@chakra-ui/react';
import { format, setDate } from 'date-fns';
import { ja } from 'date-fns/locale';

import FlexCol from '@/components/ui/FlexCol';

import { ShiftTableProps, Shift } from '../types';

export default function MobileShiftViewTable({
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
    ? users.filter((user) =>
        user.shifts.some((shift) => {
          const shiftDate = new Date(shift.startTime);
          return (
            shiftDate.getMonth() === month - 1 &&
            shiftDate.getFullYear() === year
          );
        })
      )
    : users.filter((user) => user.id === currentUserId);

  // const filteredUsers = showAllUsers
  //   ? users
  //   : users.filter((user) => user.id === currentUserId);

  const highlightColor = useColorModeValue('blue.50', 'blue.900');
  const normalColor = useColorModeValue('white', 'gray.800');

  return (
    <FlexCol gap={4} maxWidth="100%" overflow="hidden">
      <Flex
        justifyContent="flex-end"
        alignItems="center"
        as="label"
        htmlFor="show-all-users"
        py={3}
        px={4}
        borderRadius="md"
        cursor="pointer"
        // bg={useColorModeValue('gray.500', 'gray.700')}
        gap={3}
      >
        <Switch
          id="show-all-users"
          isChecked={showAllUsers}
          onChange={(e) => setShowAllUsers(e.target.checked)}
          size="lg"
        />
        <Text>全員のシフトを表示</Text>
      </Flex>
      <Box maxWidth="100%" w="80%" overflowX="auto" minW="250px">
        <Accordion allowMultiple bg="gray.900">
          {days.map((day) => {
            const shiftsForDay = filteredUsers.filter((user) =>
              user.shifts.some((s) => {
                const shiftDate = new Date(s.startTime);
                const currentDate = new Date(year, month - 1, day);
                return (
                  shiftDate.getDate() === currentDate.getDate() &&
                  shiftDate.getMonth() === currentDate.getMonth() &&
                  shiftDate.getFullYear() === currentDate.getFullYear()
                );
              })
            );
            const hasShifts = shiftsForDay.length > 0;

            return (
              <AccordionItem
                key={day}
                bg={hasShifts ? highlightColor : normalColor}
              >
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      <Text
                        fontWeight={hasShifts ? 'bold' : 'normal'}
                        color="gray.500"
                      >
                        {format(
                          setDate(new Date(year, month - 1), day),
                          'M/d(E)',
                          {
                            locale: ja,
                          }
                        )}
                      </Text>
                    </Box>
                    <Text
                      fontSize="sm"
                      color={hasShifts ? 'blue.500' : 'gray.500'}
                      mr={2}
                    >
                      {shiftsForDay.length}人のシフト
                    </Text>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <FlexCol gap={2}>
                    {shiftsForDay.map((user) => {
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
                        <Box key={user.id}>
                          <Text fontWeight="bold" color="gray.500">
                            {user.name}
                          </Text>
                          <Text color="gray.500">
                            {shift
                              ? `${formatTime(shift.startTime)} - ${formatTime(
                                  shift.endTime
                                )}`
                              : '-'}
                          </Text>
                        </Box>
                      );
                    })}
                  </FlexCol>
                </AccordionPanel>
              </AccordionItem>
            );
          })}
        </Accordion>
      </Box>
    </FlexCol>
  );
}
