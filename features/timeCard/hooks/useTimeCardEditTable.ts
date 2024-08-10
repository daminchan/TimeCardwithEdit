import { useState } from 'react';

import { useToast } from '@chakra-ui/react';
import { format, parse } from 'date-fns';

import { deleteWorkEntry, updateWorkEntry } from '../actions/timeCardActions';
import { FormattedWorkEntry, WorkDayWithEntries } from '../types';

export function useTimeCardEditTable(
  workDays: WorkDayWithEntries[],
  onDelete: () => void
) {
  const [entries, setEntries] = useState<FormattedWorkEntry[]>(
    workDays.flatMap((workDay) =>
      workDay.entries.map((entry) => ({
        id: entry.id,
        date: format(new Date(entry.startTime), 'MM/dd'),
        startTime: format(new Date(entry.startTime), 'HH:mm'),
        endTime: entry.endTime
          ? format(new Date(entry.endTime), 'HH:mm')
          : null,
        breakDuration: entry.breakDuration,
      }))
    )
  );

  const toast = useToast();

  const handleInputChange = (
    entryId: string,
    field: keyof FormattedWorkEntry,
    value: string | number | null
  ) => {
    setEntries((prevEntries) =>
      prevEntries.map((entry) =>
        entry.id === entryId ? { ...entry, [field]: value } : entry
      )
    );
  };

  const handleSave = async (entry: FormattedWorkEntry) => {
    try {
      const currentYear = new Date().getFullYear();
      const startDateTime = parse(
        `${currentYear}-${entry.date} ${entry.startTime}`,
        'yyyy-MM/dd HH:mm',
        new Date()
      );
      let endDateTime = null;
      if (entry.endTime) {
        endDateTime = parse(
          `${currentYear}-${entry.date} ${entry.endTime}`,
          'yyyy-MM/dd HH:mm',
          new Date()
        );
        if (endDateTime < startDateTime) {
          endDateTime.setDate(endDateTime.getDate() + 1);
        }
      }

      const updatedEntry = await updateWorkEntry(entry.id, {
        startTime: startDateTime,
        endTime: endDateTime,
        breakDuration: entry.breakDuration,
      });
      toast({
        title: 'エントリーを更新しました',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      setEntries((prevEntries) =>
        prevEntries.map((e) =>
          e.id === entry.id
            ? {
                ...e,
                startTime: format(new Date(updatedEntry.startTime), 'HH:mm'),
                endTime: updatedEntry.endTime
                  ? format(new Date(updatedEntry.endTime), 'HH:mm')
                  : null,
                breakDuration: updatedEntry.breakDuration,
              }
            : e
        )
      );
    } catch (error) {
      console.error('Failed to update entry:', error);
      toast({
        title: 'エントリーの更新に失敗しました',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDelete = async (entryId: string) => {
    try {
      await deleteWorkEntry(entryId);
      setEntries(entries.filter((entry) => entry.id !== entryId));
      toast({
        title: 'エントリーを削除しました',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onDelete();
    } catch (error) {
      console.error('Failed to delete entry:', error);
      toast({
        title: 'エントリーの削除に失敗しました',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return {
    entries,
    handleInputChange,
    handleSave,
    handleDelete,
  };
}
