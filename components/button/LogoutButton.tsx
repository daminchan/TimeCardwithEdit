'use client';

import { logout } from '@/features/auth/actions/authAction';

import CustomButton from './CustomButton';

export default function LogoutButton({ width = '150px' }) {
  return (
    <CustomButton
      width={width}
      onClick={() => logout()}
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
    >
      ログアウト
    </CustomButton>
  );
}
