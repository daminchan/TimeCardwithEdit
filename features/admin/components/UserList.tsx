'use client';

import { useState } from 'react';

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Box,
  Flex,
  Text,
} from '@chakra-ui/react';
import { User } from '@prisma/client';

import CustomButton from '@/components/button/CustomButton';

import DeleteUserButton from './DeleteUserButton';
import UserEditForm from './UserEditForm';

type UserListProps = {
  users: User[];
};

export default function UserList({ users: initialUsers }: UserListProps) {
  const [users, setUsers] = useState(initialUsers);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleUserUpdate = (updatedUser: User) => {
    setUsers(
      users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setEditingUser(null);
  };

  const handleUserDelete = (deletedUserId: string) => {
    setUsers(users.filter((user) => user.id !== deletedUserId));
  };

  return (
    <Box overflowX="auto">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>名前</Th>
            <Th>メールアドレス</Th>
            <Th>役割</Th>
            <Th>アクション</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user) => (
            <Tr key={user.id}>
              <Td>{user.name}</Td>
              <Td>{user.email}</Td>
              <Td>{user.role}</Td>
              <Td>
                <Flex>
                  <CustomButton
                    size="sm"
                    colorScheme="blue"
                    onClick={() => setEditingUser(user)}
                  >
                    編集
                  </CustomButton>
                  <Box width="8px" />
                  <DeleteUserButton
                    userId={user.id}
                    onDelete={handleUserDelete}
                  />
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {editingUser && (
        <Box
          position="fixed"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="rgba(0,0,0,0.5)"
          zIndex="1000"
        >
          <Box
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            bg="white"
            p={4}
            borderRadius="md"
          >
            <UserEditForm
              user={editingUser}
              onUpdate={handleUserUpdate}
              onClose={() => setEditingUser(null)}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
}
