'use client';

import { useState, useEffect } from 'react';

import { HamburgerIcon } from '@chakra-ui/icons';
import {
  IconButton,
  Box,
  useColorModeValue,
  CloseButton,
  Flex,
} from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Session } from 'next-auth';

import LogoutButton from '../button/LogoutButton';
import NavButton from '../button/NavButton';

const MotionBox = motion(Box);

interface NavbarIconProps {
  session: Session | null;
}

const NavbarIcon: React.FC<NavbarIconProps> = ({ session }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const bgColor = useColorModeValue(
    'rgba(255, 255, 255, 0.2)',
    'rgba(0, 0, 0, 0.2)'
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <IconButton
        icon={<HamburgerIcon />}
        aria-label="Open menu"
        variant="outline"
        onClick={onOpen}
      />
      <AnimatePresence>
        {isOpen && (
          <MotionBox
            position="fixed"
            top="3"
            right="0"
            bottom="0"
            width="250px"
            bg={bgColor}
            boxShadow="md"
            zIndex={20}
            initial={{ x: '100%' }}
            animate={{ x: isOpen ? 0 : '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            backdropFilter="blur(10px)"
            height="30%"
            borderTopLeftRadius="30px"
            borderBottomLeftRadius="30px"
          >
            <Flex direction="column" height="10%" p={4}>
              <Flex direction="column" gap={6}>
                <CloseButton onClick={onClose} alignSelf="flex-end" size="lg" />

                {session ? (
                  <>
                    <NavButton href="/user/my-page" onClick={onClose}>
                      マイページ
                    </NavButton>
                    {session.user.role === 'admin' && (
                      <NavButton
                        href="/admin/user-management"
                        onClick={onClose}
                      >
                        ユーザー管理
                      </NavButton>
                    )}
                    <LogoutButton width="150px" />
                  </>
                ) : (
                  <NavButton href="/login" onClick={onClose}>
                    ログイン
                  </NavButton>
                )}
              </Flex>
            </Flex>
          </MotionBox>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <MotionBox
            position="fixed"
            top="0"
            left="0"
            right="0"
            bottom="0"
            bg="blackAlpha.400"
            zIndex={10}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default NavbarIcon;
