import { Box } from '@chakra-ui/react';
import { Shift } from '@prisma/client';
import { User } from 'next-auth';

import NavButton from '@/components/button/NavButton';
import FlexCol from '@/components/ui/FlexCol';
import ShiftNextInfo from '@/features/shift/components/ShiftNextInfo';
import ShiftUpcomingList from '@/features/shift/components/ShiftUpcomingList';

import UserDetails from './UserDetails';

type UserInfoPanelProps = {
  user: Partial<User>;
  nextShift: Shift | null;
  coworkerCount: number;
  upcomingShifts: Shift[];
};

export default function UserInfoPanel({
  user,
  nextShift,
  coworkerCount,
  upcomingShifts,
}: UserInfoPanelProps) {
  return (
    <Box
      bg="rgba(255, 255, 255, 0.2)"
      shadow="md"
      borderRadius="lg"
      p={8}
      rounded={'15px'}
    >
      <FlexCol gap={6}>
        <UserDetails user={user} />
        <ShiftNextInfo nextShift={nextShift} coworkerCount={coworkerCount} />
        <ShiftUpcomingList shifts={upcomingShifts} />
        <FlexCol gap={6}>
          <NavButton href="/user/timecard-view">タイムカード</NavButton>
          {user.role === 'admin' && (
            <>
              <NavButton href="/admin/shift-edit">シフト管理</NavButton>
              <NavButton href="/admin/timeCard-edit">
                タイムカード編集
              </NavButton>
            </>
          )}
        </FlexCol>
      </FlexCol>
    </Box>
  );
}
