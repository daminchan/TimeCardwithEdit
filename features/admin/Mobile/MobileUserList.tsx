import React, { useState } from 'react';

import {
  Box,
  Text,
  Flex,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { User } from '@prisma/client';

import CustomButton from '@/components/button/CustomButton';

import DeleteUserButton from '../components/DeleteUserButton';
import UserEditForm from '../components/UserEditForm';

type MobileUserListProps = {
  users: User[];
};

export default function MobileUserList({
  users: initialUsers,
}: MobileUserListProps) {
  const [users, setUsers] = useState(initialUsers);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleUserUpdate = (updatedUser: User) => {
    setUsers(
      users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setEditingUser(null);
    onClose();
  };

  const handleUserDelete = (deletedUserId: string) => {
    setUsers(users.filter((user) => user.id !== deletedUserId));
  };

  return (
    <Flex direction="column" gap={4}>
      {users.map((user) => (
        <Box key={user.id} borderWidth={1} borderRadius="lg" p={4}>
          <Text fontWeight="bold">{user.name}</Text>
          <Text>{user.email}</Text>
          <Text>役割: {user.role}</Text>
          <Flex mt={2} gap={2}>
            <CustomButton
              size="sm"
              onClick={() => {
                setEditingUser(user);
                onOpen();
              }}
            >
              編集
            </CustomButton>
            <DeleteUserButton userId={user.id} onDelete={handleUserDelete} />
          </Flex>
        </Box>
      ))}

      <Modal isOpen={isOpen} onClose={onClose} variant={'default'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>ユーザー編集</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {editingUser && (
              <UserEditForm
                user={editingUser}
                onUpdate={handleUserUpdate}
                onClose={onClose}
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
