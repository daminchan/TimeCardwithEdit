'use client';
import React, { useEffect, useState } from 'react';

import { Box, Spinner, useBreakpointValue } from '@chakra-ui/react';
import { Shift } from '@prisma/client';
import { User } from 'next-auth';

import FlexCol from '@/components/ui/FlexCol';
import ShiftViewTable from '@/features/shift/components/ShiftViewTable';
import { ShiftTableUser } from '@/features/shift/types';
import UserInfoPanel from '@/features/user/components/UserInfoPanel';

import MobileMyPageView from '../mobile/MobileMyPageView';

type ShiftViewPageContentProps = {
  user: User;
  nextShift: Shift | null;
  coworkerCount: number;
  upcomingShifts: Shift[];
  users: ShiftTableUser[];
  year: number;
  month: number;
};

export default function ShiftViewPageContent({
  user,
  nextShift,
  coworkerCount,
  upcomingShifts,
  users,
  year,
  month,
}: ShiftViewPageContentProps) {
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
    return (
      <MobileMyPageView
        user={user}
        nextShift={nextShift}
        coworkerCount={coworkerCount}
        upcomingShifts={upcomingShifts}
        users={users}
        year={year}
        month={month}
      />
    );
  }

  return (
    <FlexCol p={8} gap={4}>
      <Box bg="rgba(255, 255, 255, 0.8)" rounded={'15px'}>
        <UserInfoPanel
          user={user}
          nextShift={nextShift}
          coworkerCount={coworkerCount}
          upcomingShifts={upcomingShifts}
        />
      </Box>
      <Box bg="rgba(255, 255, 255, 0.2)" rounded={'15px'} p={8}>
        <ShiftViewTable
          users={users}
          year={year}
          month={month}
          currentUserId={user.id}
        />
      </Box>
    </FlexCol>
  );
}
