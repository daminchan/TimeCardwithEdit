import { Box } from '@chakra-ui/react';
import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import TimeCardEditPageContent from '@/features/admin/components/TimeCardEditPageContent';
import { getAllUsers } from '@/features/timeCard/actions/timeCardActions';
import TimeCardEditPanel from '@/features/timeCard/components/edit/TimeCardEditPanel';

export default async function TimeCardEditPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  if (session.user.role !== 'admin') {
    redirect('/my-page'); // または適切なページにリダイレクト
  }

  const users = await getAllUsers();

  return (
    <Box p={8}>
      <TimeCardEditPageContent users={users} />
      {/* <TimeCardEditPanel users={users} /> */}
    </Box>
  );
}
