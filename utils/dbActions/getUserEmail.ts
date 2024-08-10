import { prisma } from '@/globals/prisma';

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        role: true, // roleフィールドを追加
      },
    });

    return user;
  } catch (error) {
    return null;
  }
};
