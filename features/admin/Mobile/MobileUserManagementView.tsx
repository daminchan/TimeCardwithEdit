'use client';
import React, { useState } from 'react';

import {
  Box,
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { User } from '@prisma/client';

import FlexCol from '@/components/ui/FlexCol';
import MobileSignUpForm from '@/features/auth/Mobile/MobileSignUpForm';

import MobileUserList from './MobileUserList';

type MobileUserManagementViewProps = {
  users: User[];
};

export default function MobileUserManagementView({
  users,
}: MobileUserManagementViewProps) {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <FlexCol p={4} gap={6}>
      <Heading as="h1" size="xl" textAlign="center" variant={'default'}>
        ユーザー管理
      </Heading>
      <Box bg="rgba(255, 255, 255, 0.1)" rounded={'15px'} p={4}>
        <MobileUserList users={users} />
      </Box>
      <Button size="lg" onClick={onOpen}>
        ユーザーを追加
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} variant={'default'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="gray.200">新規ユーザー登録</ModalHeader>
          <ModalCloseButton color="gray.200" />
          <ModalBody>
            <Box>
              <MobileSignUpForm onSignUpComplete={onClose} />
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </FlexCol>
  );
}
