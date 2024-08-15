import { Box, Container } from '@chakra-ui/react';
import { unstable_cache } from 'next/cache';
import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import { getMonthlyShifts } from '@/features/shift/actions/shiftActions';
import ShiftEditPageContent from '@/features/shift/components/ShiftEditPageContent';

// キャッシュされたgetMonthlyShifts関数を作成
const cachedGetMonthlyShifts = unstable_cache(
  async (year: number, month: number) => {
    return getMonthlyShifts(year, month);
  },
  ['monthly-shifts'],
  { revalidate: 1 }
);

export default async function ShiftEditPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;

  if (session.user.role !== 'admin') {
    redirect('/my-page'); // または適切なページにリダイレクト
  }

  // const users = await getMonthlyShifts(year, month);
  // キャッシュされた関数を使用
  const users = await cachedGetMonthlyShifts(year, month);

  return <ShiftEditPageContent users={users} year={year} month={month} />;
  // return (
  //   <Box width="100%" minHeight="100vh">
  //     <Container maxWidth="container.xl" py={8}>
  //       <Heading as="h1" size="xl" mb={6}>
  //         シフト一覧
  //       </Heading>
  //       <Box borderRadius="lg" shadow="md" p={6} mb={6}>
  //         <ShiftEditTable users={users} year={year} month={month} />
  //       </Box>
  //       <Link href="/admin/user-management">
  //         <CustomButton width="100%">ユーザー管理</CustomButton>
  //       </Link>
  //     </Container>
  //   </Box>
  // );
}
