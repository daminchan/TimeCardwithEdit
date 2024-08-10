'use client';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Select,
  Input,
  Flex,
} from '@chakra-ui/react';
import { format, subMonths } from 'date-fns';

import { CustomCard } from '@/components/ui/CustomCard';
import FlexCol from '@/components/ui/FlexCol';

import { useTimeCardData } from '../hooks/useTimeCardData';
import { TimeCardViewTableProps } from '../types';
import {
  formatDateWithDayOfWeek,
  formatTimeHHMM,
  calculateWorkTimeInMinutes,
  formatWorkTimeToHoursAndMinutes,
} from '../utils/timeCardFormat';

export default function TimeCardViewTable({ entries }: TimeCardViewTableProps) {
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
    <CustomCard>
      <FlexCol gap={4}>
        <Text fontSize="2xl" fontWeight="bold">
          タイムカード履歴
        </Text>
        <Flex gap={4} alignItems="center">
          <Select
            value={format(selectedMonth, 'yyyy-MM')}
            onChange={(e) => setSelectedMonth(new Date(e.target.value))}
            width="200px"
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
            width="150px"
          />
        </Flex>
        <FlexCol bg="blue.100" p={4} borderRadius="md" gap={2}>
          <Text fontSize="xl" fontWeight="bold">
            今月の総合計勤務時間:{' '}
            {formatWorkTimeToHoursAndMinutes(calculateTotalWorkTime)}
          </Text>
          <Text fontSize="xl" fontWeight="bold">
            今月の総支給額: {calculateTotalWage.toLocaleString()}円
          </Text>
        </FlexCol>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>日付</Th>
              <Th>開始時間</Th>
              <Th>終了時間</Th>
              <Th>休憩時間</Th>
              <Th>勤務時間</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filterEntriesBySelectedMonth.map((entry) => (
              <Tr key={entry.id}>
                <Td>{formatDateWithDayOfWeek(entry.startTime)}</Td>
                <Td>{formatTimeHHMM(entry.startTime)}</Td>
                <Td>{entry.endTime ? formatTimeHHMM(entry.endTime) : '-'}</Td>
                <Td>
                  {entry.breakDuration ? `${entry.breakDuration}分` : '-'}
                </Td>
                <Td>
                  {entry.endTime
                    ? formatWorkTimeToHoursAndMinutes(
                        calculateWorkTimeInMinutes(
                          entry.startTime,
                          entry.endTime,
                          entry.breakDuration
                        )
                      )
                    : '-'}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </FlexCol>
    </CustomCard>
  );
}
