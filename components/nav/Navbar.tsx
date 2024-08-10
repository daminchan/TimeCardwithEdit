import { Box, Flex, Spacer } from '@chakra-ui/react';
import Link from 'next/link';

import { auth } from '@/auth';

import NavbarIcon from './NavBarIcon';
import CustomButton from '../button/CustomButton';
import LogoutButton from '../button/LogoutButton';
import NavButton from '../button/NavButton';

const Navbar = async () => {
  const session = await auth();
  return (
    <Box px={4} py={2} borderBottom="1px" borderColor="gray.200">
      <Flex alignItems="center" gap={12}>
        <NavButton href="/">ホーム</NavButton>
        <Spacer />
        <Box display={{ base: 'none', sm: 'flex' }} gap={4}>
          {session ? (
            <>
              <NavButton href="/user/my-page">マイページ</NavButton>
              {session.user.role === 'admin' && (
                <NavButton href="/admin/user-management">
                  ユーザー管理
                </NavButton>
              )}
              <LogoutButton />
            </>
          ) : (
            <NavButton href="/login">ログイン</NavButton>
          )}
        </Box>
        <Box display={{ base: 'block', sm: 'none' }}>
          <NavbarIcon session={session} />
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
