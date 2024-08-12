'use client';
import React from 'react';

import { HamburgerIcon } from '@chakra-ui/icons';
import {
  IconButton,
  Button,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Flex,
} from '@chakra-ui/react';
import Link from 'next/link';
import { Session } from 'next-auth';

import LogoutButton from '../button/LogoutButton';

interface HamburgerMenuProps {
  session: Session | null;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ session }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        icon={<HamburgerIcon />}
        aria-label="Open Menu"
        size="lg"
        display={{ base: 'block', md: 'none' }}
        onClick={onOpen}
      />
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>メニュー</DrawerHeader>
            <DrawerBody>
              <Flex direction="column" gap={4}>
                <Link href="/user/my-page" passHref legacyBehavior>
                  <Button w="100%" onClick={onClose}>
                    マイページ
                  </Button>
                </Link>
                {session?.user?.role === 'admin' && (
                  <Link href="/admin" passHref legacyBehavior>
                    <Button w="100%" onClick={onClose}>
                      管理ページ
                    </Button>
                  </Link>
                )}
                {session ? (
                  <LogoutButton />
                ) : (
                  <Link href="/login" passHref legacyBehavior>
                    <Button w="100%" onClick={onClose}>
                      ログイン
                    </Button>
                  </Link>
                )}
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

export default HamburgerMenu;
