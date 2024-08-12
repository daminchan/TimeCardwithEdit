import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import AdminViewContent from '@/features/admin/components/AdminViewContent';

export default async function AdminPage() {
  const session = await auth();
  if (!session?.user || session.user.role !== 'admin') {
    redirect('/');
  }

  const linkCards = [
    { title: 'ユーザー管理', href: '/admin/user-management' },
    { title: 'タイムカード編集', href: '/admin/timeCard-edit' },
    { title: 'シフト編集', href: '/admin/shift-edit' },
  ];

  return <AdminViewContent linkCards={linkCards} />;
}
