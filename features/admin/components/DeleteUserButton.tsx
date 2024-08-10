'use client';

import CustomButton from '@/components/button/CustomButton';
import { deleteUser } from '@/features/admin/actions/userManagementActions';

type DeleteUserButtonProps = {
  userId: string;
  onDelete: (userId: string) => void;
};

export default function DeleteUserButton({
  userId,
  onDelete,
}: DeleteUserButtonProps) {
  const handleDelete = async () => {
    if (confirm('本当にこのユーザーを削除しますか？')) {
      try {
        await deleteUser(userId);
        onDelete(userId);
      } catch (error) {
        console.error('Failed to delete user:', error);
      }
    }
  };

  return (
    <CustomButton size="sm" colorScheme="red" onClick={handleDelete}>
      削除
    </CustomButton>
  );
}
