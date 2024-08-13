import { subMonths, startOfMonth, endOfMonth } from 'date-fns';
import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import {
  getTimeCardEntries,
  getLatestWorkEntry,
} from '@/features/timeCard/actions/timeCardActions';
import TimeCardView from '@/features/timeCard/components/TimeCardView';

export default async function TimecardPage() {
  const session = await auth();
  if (!session?.user) {
    redirect('/login');
  }

  const currentMonth = new Date();
  const lastMonth = subMonths(currentMonth, 1);

  const entries = await getTimeCardEntries(
    session.user.id,
    startOfMonth(lastMonth),
    endOfMonth(currentMonth)
  );

  const latestEntry = await getLatestWorkEntry(session.user.id);

  return (
    <TimeCardView
      user={session.user}
      latestEntry={latestEntry}
      entries={entries}
    />
  );
}
