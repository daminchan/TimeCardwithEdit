'use server';

import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';
import { AuthError } from 'next-auth';

import { signIn, signOut } from '@/auth';
import { signUpSchema } from '@/features/auth/lib/schemas';
import { prisma } from '@/globals/prisma';
import { getUserByEmail } from '@/utils/dbActions/getUserEmail';

export type SignUpState = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
  };
  message?: string | null;
};
export async function signUp(
  prevState: SignUpState,
  formData: FormData
): Promise<SignUpState> {
  const validatedFields = signUpSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: '入力項目が足りません。',
    };
  }

  const { name, email, password } = validatedFields.data;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return {
        message: '既に登録されているユーザーです。',
      };
    }

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  } catch (error) {
    // エラーハンドリング
    return {
      message: 'ユーザー登録中にエラーが発生しました。',
    };
  }

  redirect('/login');
}

export async function login(prevState: string | undefined, formData: FormData) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }

    throw error;
  }
}

export async function logout() {
  try {
    await signOut();
  } catch (error) {
    throw error;
  }
}
