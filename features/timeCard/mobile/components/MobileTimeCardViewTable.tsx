'use client';

import React from 'react';

import { Box, Text, Flex, Input } from '@chakra-ui/react';
import { format, subMonths } from 'date-fns';
import Select from 'react-select';

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
  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderColor: 'rgba(255, 255, 255, 0.3)',
      color: 'white',
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
      backgroundColor: 'rgba(128, 128, 255, 1)',
    }),
  };

  const monthOptions = [
    { value: format(new Date(), 'yyyy-MM'), label: '今月' },
    { value: format(subMonths(new Date(), 1), 'yyyy-MM'), label: '先月' },
  ];

  return (
    <Box p={4}>
      <Flex direction="column" gap={4}>
        <Text fontSize="xl" fontWeight="bold" color="white">
          タイムカード履歴
        </Text>
        <Flex direction="column" gap={2}>
          <Select
            value={monthOptions.find(
              (option) => option.value === format(selectedMonth, 'yyyy-MM')
            )}
            onChange={(option) =>
              setSelectedMonth(new Date(option?.value || ''))
            }
            options={monthOptions}
            styles={customStyles}
          />
          <Input
            type="number"
            value={hourlyWage}
            onChange={(e) => setHourlyWage(Number(e.target.value))}
            placeholder="時給"
            sx={{
              color: 'white',
              bg: 'rgba(255, 255, 255, 0.1)',
              borderColor: 'rgba(255, 255, 255, 0.3)',
              _placeholder: { color: 'rgba(255, 255, 255, 0.7)' },
              _hover: { bg: 'rgba(255, 255, 255, 0.15)' },
              _focus: {
                bg: 'rgba(255, 255, 255, 0.2)',
                borderColor: 'rgba(255, 255, 255, 0.5)',
                boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.5)',
              },
            }}
          />
        </Flex>
        <Box bg="rgba(255, 255, 255, 0.1)" p={3} borderRadius="md">
          <Text fontSize="sm" fontWeight="bold" color="white">
            今月の総合計勤務時間:{' '}
            {formatWorkTimeToHoursAndMinutes(calculateTotalWorkTime)}
          </Text>
          <Text fontSize="sm" fontWeight="bold" color="white">
            今月の総支給額: {calculateTotalWage.toLocaleString()}円
          </Text>
        </Box>
        <Flex direction="column" gap={3}>
          {filterEntriesBySelectedMonth.map((entry) => (
            <Box
              key={entry.id}
              borderWidth="1px"
              borderRadius="md"
              p={3}
              borderColor="rgba(255, 255, 255, 0.3)"
              bg="rgba(255, 255, 255, 0.1)"
            >
              <Text fontWeight="bold" color="white">
                {formatDateWithDayOfWeek(entry.startTime)}
              </Text>
              <Flex justifyContent="space-between">
                <Text fontSize="sm" color="white">
                  開始: {formatTimeHHMM(entry.startTime)}
                </Text>
                <Text fontSize="sm" color="white">
                  終了: {entry.endTime ? formatTimeHHMM(entry.endTime) : '-'}
                </Text>
              </Flex>
              <Flex justifyContent="space-between">
                <Text fontSize="sm" color="white">
                  休憩: {entry.breakDuration ? `${entry.breakDuration}分` : '-'}
                </Text>
                <Text fontSize="sm" color="white">
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
