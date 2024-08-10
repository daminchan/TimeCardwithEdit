import Link from 'next/link';

import LoginForm from '@/features/auth/components/Login-form';

export default function LoginPage() {
  return (
    <main className="flex justify-center md:h-screen">
      <div className="flex flex-col items-center w-full max-w-[400px]">
        <h1 className="my-6 w-full text-center text-2xl">ログインページ</h1>
        <LoginForm />
        <div className="flex flex-col mt-8 text-center">
          <Link
            href="/register"
            className="bg-blue-500 text-white rounded-lg px-8 py-2 hover:bg-blue-400 focus-visible:outline-offset-2"
          >
            ユーザー登録
          </Link>
        </div>
      </div>
    </main>
  );
}
