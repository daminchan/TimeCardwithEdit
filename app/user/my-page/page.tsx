import { Box } from '@chakra-ui/react';
import { unstable_cache } from 'next/cache';
import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import {
  getMonthlyShifts,
  getNextShiftWithCoworkers,
  getUpcomingShifts,
} from '@/features/shift/actions/shiftActions';
import ShiftViewPageContent from '@/features/shift/components/ShiftViewPageContent';

const cachedGetMonthlyShifts = unstable_cache(
  async (year: number, month: number) => getMonthlyShifts(year, month),
  ['monthly-shifts'],
  { revalidate: 30 }
);

export default async function MyPage() {
  const session = await auth();
  if (!session?.user) redirect('/login');

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;

  const users = await cachedGetMonthlyShifts(year, month);
  const { nextShift, coworkerCount } = await getNextShiftWithCoworkers(
    session.user.id
  );
  const upcomingShifts = session.user.id
    ? await getUpcomingShifts(session.user.id, 5)
    : [];

  return (
    <Box>
      <ShiftViewPageContent
        user={session.user}
        nextShift={nextShift}
        coworkerCount={coworkerCount}
        upcomingShifts={upcomingShifts}
        users={users}
        year={year}
        month={month}
      />
    </Box>
  );
}
