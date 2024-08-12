'use client';

import React from 'react';

import { Box, Heading, Flex, Link, useBreakpointValue } from '@chakra-ui/react';

import CustomButton from '@/components/button/CustomButton';

import ShiftEditTable from './ShiftEditTable';
import MobileShiftEditTable from '../mobile/MobileShiftEditTable';
import { User } from '../types';

interface ShiftEditPageContentProps {
  users: User[];
  year: number;
  month: number;
}

export default function ShiftEditPageContent({
  users,
  year,
  month,
}: ShiftEditPageContentProps) {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Flex direction="column" gap={6} width="100%">
      <Heading
        as="h1"
        size={isMobile ? 'lg' : 'xl'}
        textAlign={isMobile ? 'center' : 'left'}
      >
        シフト一覧
      </Heading>
      <Box borderRadius="lg" shadow="md" p={isMobile ? 4 : 6}>
        {isMobile ? (
          <MobileShiftEditTable users={users} year={year} month={month} />
        ) : (
          <ShiftEditTable users={users} year={year} month={month} />
        )}
      </Box>
      <Link href="/admin/user-management">
        <CustomButton width="100%">ユーザー管理</CustomButton>
      </Link>
    </Flex>
  );
}
