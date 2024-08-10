import { useState, useEffect } from 'react';

import { useToast } from '@chakra-ui/react';
import { WorkDay, WorkEntry } from '@prisma/client';

import {
  deleteAllWorkEntriesForMonth,
  getUserWorkDaysForMonth,
} from '../actions/timeCardActions';

export function useTimeCardEdit() {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth() + 1
  );
  const [workDays, setWorkDays] = useState<
    (WorkDay & { entries: WorkEntry[] })[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (selectedUserId) {
      setIsLoading(true);
      setWorkDays([]);
      getUserWorkDaysForMonth(selectedUserId, selectedYear, selectedMonth)
        .then(setWorkDays)
        .finally(() => setIsLoading(false));
    }
  }, [selectedUserId, selectedYear, selectedMonth]);

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(event.target.value);
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(Number(event.target.value));
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(Number(event.target.value));
  };

  const handleDeleteAllForMonth = async () => {
    if (!selectedUserId) return;

    if (
      window.confirm(
        `${selectedYear}年${selectedMonth}月のすべての勤退記録を削除しますか？`
      )
    ) {
      setIsLoading(true);
      try {
        await deleteAllWorkEntriesForMonth(
          selectedUserId,
          selectedYear,
          selectedMonth
        );
        setWorkDays([]);
        toast({
          title: 'すべての勤退記録を削除しました',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        console.error('Failed to delete all entries:', error);
        toast({
          title: '勤退記録の削除に失敗しました',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleEntryDelete = () => {
    if (selectedUserId) {
      setIsLoading(true);
      getUserWorkDaysForMonth(selectedUserId, selectedYear, selectedMonth)
        .then(setWorkDays)
        .finally(() => setIsLoading(false));
    }
  };

  return {
    selectedUserId,
    selectedYear,
    selectedMonth,
    workDays,
    isLoading,
    handleUserChange,
    handleYearChange,
    handleMonthChange,
    handleDeleteAllForMonth,
    handleEntryDelete,
  };
}
