'use client';

import { Flex, useBreakpointValue } from '@chakra-ui/react';
import { Session } from 'next-auth';

import HamburgerMenu from './HamburgerMenu';
import LogoutButton from '../button/LogoutButton';
import NavButton from '../button/NavButton';

interface ClientNavbarProps {
  session: Session | null;
}

const ClientNavbar: React.FC<ClientNavbarProps> = ({ session }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return isMobile ? (
    <HamburgerMenu session={session} />
  ) : (
    <Flex align="center" gap={4}>
      {session ? (
        <>
          {session.user.role === 'admin' && (
            <NavButton href="/admin">管理ページ</NavButton>
          )}
          {session.user.role === 'admin' && (
            <NavButton href="/user/my-page">マイページ</NavButton>
          )}
          <LogoutButton />
        </>
      ) : (
        <NavButton href="/login">ログイン</NavButton>
      )}
    </Flex>
  );
};

export default ClientNavbar;
