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

//レスポンシブ非対応
// import { auth } from "@/auth";
// import FlexCol from "@/components/ui/FlexCol";
// import {
//   getLatestWorkEntry,
//   getTimeCardEntries,
// } from "@/features/timeCard/actions/timeCardActions";
// import TimeCardPanel from "@/features/timeCard/components/TimeCardPanel";

// import TimeCardViewTable from "@/features/timeCard/components/TimeCardViewTable";

// import { Box, Heading } from "@chakra-ui/react";
// import { endOfMonth, startOfMonth, subMonths } from "date-fns";

// import { redirect } from "next/navigation";

// export default async function TimecardPage() {
//   const session = await auth();
//   if (!session?.user?.id) {
//     redirect("/login");
//   }
//   const currentMonth = new Date();
//   const lastMonth = subMonths(currentMonth, 1);

//   const entries = await getTimeCardEntries(
//     session.user.id,
//     startOfMonth(lastMonth),
//     endOfMonth(currentMonth)
//   );

//   const latestEntry = await getLatestWorkEntry(session.user.id);

//   return (
//     <Box>
//       <FlexCol gap={12}>
//         <Heading as="h1" size="2xl" textAlign="center">
//           {session.user.name}のタイムカード
//         </Heading>
//         <TimeCardPanel latestEntry={latestEntry} userId={session.user.id} />
//         <TimeCardViewTable entries={entries} />
//       </FlexCol>
//     </Box>
//   );
// }
