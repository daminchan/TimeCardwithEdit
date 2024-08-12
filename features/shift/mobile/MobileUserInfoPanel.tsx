import React from 'react';

import { Box, Text, VStack } from '@chakra-ui/react';
import { Shift } from '@prisma/client';
import { User } from 'next-auth';

import NavButton from '@/components/button/NavButton';
import FlexCol from '@/components/ui/FlexCol';
import ShiftNextInfo from '@/features/shift/components/ShiftNextInfo';

import MobileShiftNextInfo from './MobileShiftNextInfo';
import MobileShiftUpcomingList from './MobileShiftUpcomingList';
import ShiftUpcomingList from '../components/ShiftUpcomingList';

type MobileUserInfoPanelProps = {
  user: User;
  nextShift: Shift | null;
  coworkerCount: number;
  upcomingShifts: Shift[];
};

export default function MobileUserInfoPanel({
  user,
  nextShift,
  coworkerCount,
  upcomingShifts,
}: MobileUserInfoPanelProps) {
  return (
    <Box borderRadius="lg" p={4}>
      <FlexCol gap={4}>
        <Text fontSize="lg">{user.name}さん</Text>
        <MobileShiftNextInfo
          nextShift={nextShift}
          coworkerCount={coworkerCount}
        />
        <MobileShiftUpcomingList shifts={upcomingShifts} />
        <FlexCol gap={6}>
          <NavButton href="/user/timecard-view">タイムカード</NavButton>
          {user.role === 'admin' && (
            <>
              <NavButton href="/admin">管理ページ</NavButton>
            </>
          )}
        </FlexCol>
      </FlexCol>
    </Box>
  );
}
