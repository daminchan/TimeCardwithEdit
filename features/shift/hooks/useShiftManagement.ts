import { useState } from 'react';

import { useToast, useDisclosure } from '@chakra-ui/react';
import { formatInTimeZone } from 'date-fns-tz';

import { createShift, deleteShift, updateShift } from '../actions/shiftActions';
import { Shift, EditedShift } from '../types';
import { createShiftActionToast } from '../utils/toastUtils';

export const useShiftManagement = () => {
  const [selectedShift, setSelectedShift] = useState<Shift | null>(null);
  const [editedShift, setEditedShift] = useState<EditedShift>({
    date: '',
    startTime: '',
    endTime: '',
    status: 'SCHEDULED',
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleDelete = async (shiftId: string) => {
    try {
      await deleteShift(shiftId);
      toast({
        title: 'シフトを削除しました',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    } catch (error) {
      console.error('Shift deletion failed:', error);
      toast({
        title: 'シフトの削除に失敗しました',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  const handleUpdate = async () => {
    if (selectedShift && selectedShift.id) {
      toast(
        createShiftActionToast(
          '更新',
          async () => {
            await updateShift(selectedShift.id, getShiftData());
            onClose(); // モーダルを閉じる
          },
          toast
        )
      );
    }
  };

  // const handleAddShift = async () => {
  //   if (selectedShift && !selectedShift.id) {
  //     toast(
  //       createShiftActionToast(
  //         '追加',
  //         async () => {
  //           await createShift(selectedShift.userId, getShiftData());
  //           onClose(); // モーダルを閉じる
  //         },
  //         toast
  //       )
  //     );
  //   }
  // };

  const handleAddShift = async () => {
    if (selectedShift && !selectedShift.id) {
      try {
        await createShift(selectedShift.userId, getShiftData());
        onClose(); // モーダルを閉じる
        toast({
          title: 'シフトを追加しました',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
      } catch (error) {
        console.error('Shift addition failed:', error);
        toast({
          title: 'シフトの追加に失敗しました',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
      }
    }
  };

  const getShiftData = () => ({
    date: new Date(editedShift.date),
    startTime: new Date(editedShift.startTime),
    endTime: new Date(editedShift.endTime),
    status: editedShift.status,
  });

  const openAddModal = (userId: string) => {
    const now = new Date();
    setSelectedShift({
      id: '',
      userId,
      date: now,
      startTime: now,
      endTime: now,
      status: 'SCHEDULED',
    });
    setEditedShift({
      date: formatInTimeZone(now, 'Asia/Tokyo', 'yyyy-MM-dd'),
      startTime: formatInTimeZone(now, 'Asia/Tokyo', "yyyy-MM-dd'T'HH:mm"),
      endTime: formatInTimeZone(now, 'Asia/Tokyo', "yyyy-MM-dd'T'HH:mm"),
      status: 'SCHEDULED',
    });
    onOpen(); // モーダルを開く
  };

  const openEditModal = (shift: Shift) => {
    setSelectedShift(shift);
    const shiftDate = new Date(shift.startTime);
    setEditedShift({
      date: formatInTimeZone(shiftDate, 'Asia/Tokyo', 'yyyy-MM-dd'),
      startTime: formatInTimeZone(
        shiftDate,
        'Asia/Tokyo',
        "yyyy-MM-dd'T'HH:mm"
      ),
      endTime: formatInTimeZone(
        new Date(shift.endTime),
        'Asia/Tokyo',
        "yyyy-MM-dd'T'HH:mm"
      ),
      status: shift.status,
    });
    onOpen(); // モーダルを開く
  };

  return {
    selectedShift,
    editedShift,
    setEditedShift,
    handleDelete,
    handleUpdate,
    handleAddShift,
    openAddModal,
    openEditModal,
    isOpen,
    onClose,
  };
};
