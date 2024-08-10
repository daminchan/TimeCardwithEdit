import { useState, useMemo } from 'react';

import { WorkEntry } from '@prisma/client';
import {
  isSameMonth,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
} from 'date-fns';

import { calculateWorkTimeInMinutes } from '../utils/timeCardFormat';

export const useTimeCardData = (entries: WorkEntry[]) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [hourlyWage, setHourlyWage] = useState(1000);

  const filterEntriesBySelectedMonth = useMemo(() => {
    return entries.filter((entry) =>
      isSameMonth(entry.startTime, selectedMonth)
    );
  }, [entries, selectedMonth]);

  const generateDaysInSelectedMonth = useMemo(() => {
    const start = startOfMonth(selectedMonth);
    const end = endOfMonth(selectedMonth);
    return eachDayOfInterval({ start, end });
  }, [selectedMonth]);

  const calculateTotalWorkTime = useMemo(() => {
    return filterEntriesBySelectedMonth.reduce((total, entry) => {
      if (entry.endTime) {
        return (
          total +
          calculateWorkTimeInMinutes(
            entry.startTime,
            entry.endTime,
            entry.breakDuration
          )
        );
      }
      return total;
    }, 0);
  }, [filterEntriesBySelectedMonth]);

  const calculateTotalWage = Math.floor(
    (calculateTotalWorkTime / 60) * hourlyWage
  );

  return {
    selectedMonth,
    setSelectedMonth,
    hourlyWage,
    setHourlyWage,
    filterEntriesBySelectedMonth,
    generateDaysInSelectedMonth,
    calculateTotalWorkTime,
    calculateTotalWage,
  };
};
