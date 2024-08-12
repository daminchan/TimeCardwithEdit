import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import { getAllUsers } from '@/features/admin/actions/userManagementActions';
import UserManagementContent from '@/features/admin/components/UserManagementContent';

export default async function UserManagementPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }
  const users = await getAllUsers();

  return <UserManagementContent users={users} />;
}

// import { redirect } from 'next/navigation';

// import { auth } from '@/auth';
// import FlexCol from '@/components/ui/FlexCol';
// import { getAllUsers } from '@/features/admin/actions/userManagementActions';
// import UserList from '@/features/admin/components/UserList';
// import SignUpForm from '@/features/auth/components/signup-form';
// import { Heading } from '@chakra-ui/react';

// export default async function UserManagementPage() {
//   const session = await auth();

//   if (!session?.user) {
//     redirect('/login');
//   }

//   const users = await getAllUsers();

//   return (
//     <FlexCol>
//       <Heading as="h1" variant="page">
//         ユーザー管理
//       </Heading>
//       <UserList users={users} />
//       <SignUpForm />
//     </FlexCol>
//   );
// }
