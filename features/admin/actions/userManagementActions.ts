'use server';

import { User } from '@prisma/client';

import { auth } from '@/auth';
import { prisma } from '@/globals/prisma';
import { getUserByEmail } from '@/utils/dbActions/getUserEmail';

export async function updateSession() {
  const session = await auth();
  if (session?.user?.email) {
    // ユーザー情報を再取得
    const updatedUser = await getUserByEmail(session.user.email);
    if (updatedUser) {
      // セッションを更新
      session.user = {
        ...session.user,
        role: updatedUser.role,
      };
    }
  }
}

export async function getAllUsers(): Promise<User[]> {
  return prisma.user.findMany();
}

export async function updateUserEmail(
  userId: string,
  email: string
): Promise<User> {
  return prisma.user.update({
    where: { id: userId },
    data: { email },
  });
}

export async function deleteUser(userId: string): Promise<void> {
  await prisma.user.delete({
    where: { id: userId },
  });
}

export async function updateUserRole(
  userId: string,
  role: string
): Promise<User> {
  return prisma.user.update({
    where: { id: userId },
    data: { role },
  });
}
