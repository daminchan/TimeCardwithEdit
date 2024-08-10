import { Box, Heading, Container, Link } from '@chakra-ui/react';
import { unstable_cache } from 'next/cache';
import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import CustomButton from '@/components/button/CustomButton';
import FlexCol from '@/components/ui/FlexCol';
import { getMonthlyShifts } from '@/features/shift/actions/shiftActions';
import ShiftEditTable from '@/features/shift/components/ShiftEditTable';
import ShiftViewTable from '@/features/shift/components/ShiftViewTable';
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

  return (
    <FlexCol>
      <Box py={8}>
        <Heading as="h1" size="xl" mb={6}>
          シフト一覧
        </Heading>
        <ShiftEditTable users={users} year={year} month={month} />
      </Box>
      <Link href="/admin/user-management">
        <CustomButton>ユーザー管理</CustomButton>
      </Link>
    </FlexCol>
  );
}
