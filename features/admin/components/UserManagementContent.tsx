'use client';

import { useState, useEffect } from 'react';

import { Box, Heading, Spinner, useBreakpointValue } from '@chakra-ui/react';
import { User } from '@prisma/client';

import FlexCol from '@/components/ui/FlexCol';
import SignUpForm from '@/features/auth/components/signup-form';

import UserList from './UserList';
import MobileUserManagementView from '../Mobile/MobileUserManagementView';

type UserManagementContentProps = {
  users: User[];
};

export default function UserManagementContent({
  users,
}: UserManagementContentProps) {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(false);
  }, [isMobile]);

  if (isLoading) {
    return (
      <Box h="100vh" display="flex" alignItems="center" justifyContent="center">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (isMobile) {
    return <MobileUserManagementView users={users} />;
  }

  return (
    <Box p={4}>
      <FlexCol gap={6}>
        <Heading as="h1" size={'xl'} textAlign="center">
          ユーザー管理
        </Heading>
        <UserList users={users} />
        <SignUpForm />
      </FlexCol>
    </Box>
  );
}
