import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import FlexCol from '@/components/ui/FlexCol';
import { getAllUsers } from '@/features/admin/actions/userManagementActions';
import UserList from '@/features/admin/components/UserList';
import SignUpForm from '@/features/auth/components/signup-form';

export default async function UserManagementPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  const users = await getAllUsers();

  return (
    <FlexCol>
      <h1>ユーザー管理</h1>
      <UserList users={users} />
      <SignUpForm />
    </FlexCol>
  );
}
