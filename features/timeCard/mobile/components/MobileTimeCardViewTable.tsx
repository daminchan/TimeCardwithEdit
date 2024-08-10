'use client';

import React from 'react';

import { Box, Text, Flex, Select, Input } from '@chakra-ui/react';
import { format, subMonths } from 'date-fns';

import { useTimeCardData } from '../../hooks/useTimeCardData';
import { TimeCardViewTableProps } from '../../types';
import {
  formatDateWithDayOfWeek,
  formatTimeHHMM,
  calculateWorkTimeInMinutes,
  formatWorkTimeToHoursAndMinutes,
} from '../../utils/timeCardFormat';

export default function MobileTimeCardViewTable({
  entries,
}: TimeCardViewTableProps) {
  const {
    selectedMonth,
    setSelectedMonth,
    hourlyWage,
    setHourlyWage,
    filterEntriesBySelectedMonth,
    calculateTotalWorkTime,
    calculateTotalWage,
  } = useTimeCardData(entries);

  return (
    <Box p={4}>
      <Flex direction="column" gap={4}>
        <Text fontSize="xl" fontWeight="bold">
          タイムカード履歴
        </Text>
        <Flex direction="column" gap={2}>
          <Select
            value={format(selectedMonth, 'yyyy-MM')}
            onChange={(e) => setSelectedMonth(new Date(e.target.value))}
          >
            <option value={format(new Date(), 'yyyy-MM')}>今月</option>
            <option value={format(subMonths(new Date(), 1), 'yyyy-MM')}>
              先月
            </option>
          </Select>
          <Input
            type="number"
            value={hourlyWage}
            onChange={(e) => setHourlyWage(Number(e.target.value))}
            placeholder="時給"
          />
        </Flex>
        <Box bg="blue.50" p={3} borderRadius="md">
          <Text fontSize="sm" fontWeight="bold">
            今月の総合計勤務時間:{' '}
            {formatWorkTimeToHoursAndMinutes(calculateTotalWorkTime)}
          </Text>
          <Text fontSize="sm" fontWeight="bold">
            今月の総支給額: {calculateTotalWage.toLocaleString()}円
          </Text>
        </Box>
        <Flex direction="column" gap={3}>
          {filterEntriesBySelectedMonth.map((entry) => (
            <Box key={entry.id} borderWidth="1px" borderRadius="md" p={3}>
              <Text fontWeight="bold">
                {formatDateWithDayOfWeek(entry.startTime)}
              </Text>
              <Flex justifyContent="space-between">
                <Text fontSize="sm">
                  開始: {formatTimeHHMM(entry.startTime)}
                </Text>
                <Text fontSize="sm">
                  終了: {entry.endTime ? formatTimeHHMM(entry.endTime) : '-'}
                </Text>
              </Flex>
              <Flex justifyContent="space-between">
                <Text fontSize="sm">
                  休憩: {entry.breakDuration ? `${entry.breakDuration}分` : '-'}
                </Text>
                <Text fontSize="sm">
                  勤務時間:{' '}
                  {entry.endTime
                    ? formatWorkTimeToHoursAndMinutes(
                        calculateWorkTimeInMinutes(
                          entry.startTime,
                          entry.endTime,
                          entry.breakDuration
                        )
                      )
                    : '-'}
                </Text>
              </Flex>
            </Box>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
}
