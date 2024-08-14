import React from 'react';

import { Box, Flex, Text, VStack } from '@chakra-ui/react';
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
    <Flex
      align="center"
      justify="center"
      borderRadius="15px"
      boxShadow="0 6px 12px rgba(0, 0, 0, 0.5)"
      width="100%"
    >
      <Flex
        direction="column"
        gap={3}
        width="100%"
        align="center"
        justify="center"
      >
        <Text fontSize="lg">{user.name}さん</Text>
        <MobileShiftNextInfo
          nextShift={nextShift}
          coworkerCount={coworkerCount}
        />
        <MobileShiftUpcomingList shifts={upcomingShifts} />
        <FlexCol gap={2}>
          <NavButton href="/user/timecard-view">タイムカード</NavButton>
          {user.role === 'admin' && (
            <>
              <NavButton href="/admin">管理ページ</NavButton>
            </>
          )}
        </FlexCol>
      </Flex>
    </Flex>
  );
}
