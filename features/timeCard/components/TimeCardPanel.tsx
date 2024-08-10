'use client';

import { useRef, useState } from 'react';

import { useToast } from '@chakra-ui/react';
import { WorkEntry } from '@prisma/client';

import ToggleButton from '@/components/button/ToggleButton';
import { CustomCard } from '@/components/ui/CustomCard';
import { Dialog } from '@/components/ui/Dialog';
import FlexCol from '@/components/ui/FlexCol';

import TimeCardDisplay from './TimeCardDisplay';
import { clockIn, clockOut } from '../actions/timeCardActions';

type TimeCardPanelProps = {
  latestEntry: WorkEntry | null;
  userId: string;
};

export default function TimeCardPanel({
  latestEntry,
  userId,
}: TimeCardPanelProps) {
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

  // エントリーの状態に基づいて、ボタンの無効状態を計算
  const isClockInDisabled = !!entry?.startTime && !entry?.endTime;
  const isClockOutDisabled = !entry?.startTime || !!entry?.endTime;

  return (
    <CustomCard>
      <FlexCol minW="400px" p={4}>
        <TimeCardDisplay entry={entry} />
        <ToggleButton
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
      </FlexCol>
    </CustomCard>
  );
}
{
  /* <TimeCardClockButtons
          onClockIn={handleClockIn}
          onClockOut={handleClockOut}
          isClockInDisabled={!!entry?.startTime && !entry?.endTime}
          isClockOutDisabled={!entry?.startTime || !!entry?.endTime}
        /> */
}
// const handleClockOut = async () => {
//   if (entry) {
//     toast({
//       title: "退勤しますか？",
//       description: "退勤処理を行います。よろしいですか？",
//       status: "info",
//       duration: null,
//       isClosable: true,
//       position: "top",
//       onCloseComplete: async () => {
//         const updatedEntry = await clockOut(entry.id);
//         setEntry(updatedEntry);
//         toast({
//           title: "退勤しました",
//           status: "success",
//           duration: 3000,
//           isClosable: true,
//           position: "top",
//         });
//       },
//     });
//   }
// };
