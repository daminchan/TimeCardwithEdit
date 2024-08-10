'use client';

import { useState } from 'react';

import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Heading,
  useToast,
} from '@chakra-ui/react';
import { User } from '@prisma/client';

import CustomButton from '@/components/button/CustomButton';
import FlexCol from '@/components/ui/FlexCol';
import {
  updateSession,
  updateUserEmail,
  updateUserRole,
} from '@/features/admin/actions/userManagementActions';

type UserEditFormProps = {
  user: User;
  onUpdate: (updatedUser: User) => void;
  onClose: () => void;
};

export default function UserEditForm({
  user,
  onUpdate,
  onClose,
}: UserEditFormProps) {
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const updatedUser = await updateUserEmail(user.id, email);
      await updateUserRole(user.id, role);
      onUpdate({ ...updatedUser, role });

      // セッションを更新
      await updateSession();

      toast({
        title: 'ユーザー情報を更新しました',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      console.error('Failed to update user:', error);
      toast({
        title: 'ユーザー情報の更新に失敗しました',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit} width="100%" maxWidth="400px">
      <FlexCol align="stretch">
        <Heading size="md">ユーザー編集</Heading>
        <FormControl>
          <FormLabel>メールアドレス</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormControl>
        <FormControl>
          <FormLabel>役割</FormLabel>
          <Select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">ユーザー</option>
            <option value="admin">管理者</option>
          </Select>
        </FormControl>
        <CustomButton type="submit" isLoading={isLoading} colorScheme="blue">
          更新
        </CustomButton>
        <CustomButton onClick={onClose} variant="outline">
          キャンセル
        </CustomButton>
      </FlexCol>
    </Box>
  );
}
