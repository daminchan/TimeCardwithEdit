'use client';

import React, { useState, useRef } from 'react';

import { useToast, Flex, Box } from '@chakra-ui/react';
import { WorkEntry } from '@prisma/client';

import { Dialog } from '@/components/ui/Dialog';

import MobileTimeCardDisplay from './MobileTimeCardDisplay';
import MobileToggleButton from './MobileToggleButton';
import { clockIn, clockOut } from '../../actions/timeCardActions';

type MobileTimeCardPanelProps = {
  latestEntry: WorkEntry | null;
  userId: string;
};

export default function MobileTimeCardPanel({
  latestEntry,
  userId,
}: MobileTimeCardPanelProps) {
  const [entry, setEntry] = useState<WorkEntry | null>(latestEntry);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const toast = useToast();

  const handleClockIn = async () => {
    const newEntry = await clockIn(userId);
    setEntry(newEntry);
    toast({
      title: '出勤しました',
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top',
    });
  };

  const handleClockOut = async () => {
    if (entry) {
      setIsAlertOpen(true);
    }
  };

  const onClockOut = async () => {
    if (entry) {
      const updatedEntry = await clockOut(entry.id);
      setEntry(updatedEntry);
      setIsAlertOpen(false);
      toast({
        title: '退勤しました',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  const isClockInDisabled = !!entry?.startTime && !entry?.endTime;
  const isClockOutDisabled = !entry?.startTime || !!entry?.endTime;

  return (
    <Box
      bg="rgba(255, 255, 255, 0.2)"
      borderRadius="15px"
      boxShadow="0 6px 12px rgba(0, 0, 0, 0.5)"
      p={4}
    >
      <Flex direction="column" gap={4}>
        <MobileTimeCardDisplay entry={entry} />
        <MobileToggleButton
          options={[
            {
              label: '出勤',
              onClick: handleClockIn,
              isDisabled: isClockInDisabled,
              colorScheme: 'blue',
            },
            {
              label: '退勤',
              onClick: handleClockOut,
              isDisabled: isClockOutDisabled,
              colorScheme: 'red',
            },
          ]}
        />
        <Dialog
          isOpen={isAlertOpen}
          onClose={() => setIsAlertOpen(false)}
          onConfirm={onClockOut}
          title="退勤確認"
          message="退勤処理を行います。よろしいですか？"
          confirmText="退勤する"
          cancelText="キャンセル"
          cancelRef={cancelRef}
        />
      </Flex>
    </Box>
  );
}
