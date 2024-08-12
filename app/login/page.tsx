import Link from 'next/link';

import LoginForm from '@/features/auth/components/Login-form';

export default function LoginPage() {
  return (
    <main className="flex justify-center md:h-screen">
      <div className="flex flex-col items-center w-full max-w-[400px]">
        <h1 className="my-6 w-full text-center text-2xl">ログインページ</h1>
        <LoginForm />
      </div>
    </main>
  );
}
