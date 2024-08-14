import React, { useState } from 'react';

import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading, IconButton, VStack } from '@chakra-ui/react';
import { Shift } from '@prisma/client';
import { motion, AnimatePresence } from 'framer-motion';
import { User } from 'next-auth';

import MobileFlexColumnContainer from '@/components/ui/MobileFlexColumnContainer';
import { ShiftTableUser } from '@/features/shift/types';

import MobileShiftViewTable from './MobileShiftViewTable';
import MobileUserInfoPanel from './MobileUserInfoPanel';
import FloatingBubbles from '@/components/animation/FloatingBubbles';

type MobileMyPageViewProps = {
  user: User;
  nextShift: Shift | null;
  coworkerCount: number;
  upcomingShifts: Shift[];
  users: ShiftTableUser[];
  year: number;
  month: number;
};

const blueBubbleColors = {
  color1: 'rgba(65, 105, 225, 0.3)', // ロイヤルブルー
  color2: 'rgba(135, 206, 250, 0.5)', // ライトスカイブルー
  color3: 'rgba(30, 144, 255, 0.5)', // ドジャーブルー
};
const orangeBubbleColors = {
  color1: 'rgba(255, 140, 0, 0.4)', // ダークオレンジ
  color2: 'rgba(255, 165, 0, 0.5)', // オレンジ
  color3: 'rgba(255, 69, 0, 0.4)', // レッドオレンジ
};

const lightGreenBubbleColors = {
  color1: 'rgba(144, 238, 144, 0.4)', // ライトグリーン
  color2: 'rgba(152, 251, 152, 0.5)', // パレグリーン
  color3: 'rgba(50, 205, 50, 0.3)', // ライムグリーン
};

const icyBlueBubbleColors = {
  color1: 'rgba(135, 206, 250, 0.5)', // ライトスカイブルー
  color2: 'rgba(173, 216, 230, 0.6)', // ライトブルー
  color3: 'rgba(0, 191, 255, 0.4)', // ディープスカイブルー
};
export default function MobileMyPageView({
  user,
  nextShift,
  coworkerCount,
  upcomingShifts,
  users,
  year,
  month,
}: MobileMyPageViewProps) {
  const [showPanel, setShowPanel] = useState(true);
  const [isClicked, setIsClicked] = useState(false);

  const handleTogglePanel = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
      setShowPanel(!showPanel);
    }, 100);
  };
  return (
    <MobileFlexColumnContainer>
      <Heading as="h1" size="xl" textAlign="center">
        マイページ
      </Heading>
      <Flex justifyContent="center" position="relative">
        <Box position="relative" width="60px" height="60px">
          <AnimatePresence>
            {isClicked && (
              <>
                <motion.div
                  initial={{ scale: 1, opacity: 0.8 }}
                  animate={{ scale: 3, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    background:
                      'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)',
                    filter: 'blur(8px)',
                  }}
                />
                <motion.div
                  initial={{ scale: 1, opacity: 0.6 }}
                  animate={{ scale: 2.5, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    background:
                      'radial-gradient(circle, rgba(255,165,0,0.6) 0%, rgba(255,165,0,0) 70%)',
                    filter: 'blur(6px)',
                  }}
                />
                <motion.div
                  initial={{ scale: 1, opacity: 0.4 }}
                  animate={{ scale: 2, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: 'easeOut', delay: 0.2 }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    background:
                      'radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 70%)',
                    filter: 'blur(4px)',
                  }}
                />
              </>
            )}
          </AnimatePresence>
          <motion.div
            animate={isClicked ? { scale: 0.9 } : { scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <Box
              as="button"
              onClick={handleTogglePanel}
              position="relative"
              width="60px"
              height="60px"
              borderRadius="full"
              bg="transparent"
              overflow="hidden"
              boxShadow="0 0 15px rgba(255, 255, 255, 0.5), inset 0 0 15px rgba(255, 255, 255, 0.5)"
              _before={{
                content: '""',
                position: 'absolute',
                top: '-50%',
                left: '-50%',
                width: '200%',
                height: '200%',
                background:
                  'radial-gradient(circle at 70% 70%, rgba(255, 165, 0, 0.4), rgba(255, 255, 255, 0) 70%)',
                opacity: 0.5,
              }}
              _after={{
                content: '""',
                position: 'absolute',
                top: '-50%',
                left: '-50%',
                width: '200%',
                height: '200%',
                background:
                  'radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0) 70%)',
                opacity: 0.5,
              }}
              css={{
                backdropFilter: 'blur(5px)',
                background:
                  'linear-gradient(135deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.1))',
                '&:focus': {
                  outline: 'none',
                  boxShadow:
                    '0 0 15px rgba(255, 255, 255, 0.5), inset 0 0 15px rgba(255, 255, 255, 0.5)',
                },
              }}
              _hover={{
                transform: 'scale(1.05)',
                boxShadow:
                  '0 0 20px rgba(255, 255, 255, 0.7), inset 0 0 20px rgba(255, 255, 255, 0.7)',
              }}
              transition="all 0.3s"
            >
              <Box
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                color="white"
                fontSize="24px"
              >
                {showPanel ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </Box>
            </Box>
          </motion.div>
        </Box>
      </Flex>
      <Box
        borderColor="gray.200"
        position="relative"
        borderRadius="lg"
        minHeight="300px"
        width="100%"
        maxWidth={{
          base: '100%',
          sm: '540px',
          md: '720px',
          lg: '960px',
          xl: '1140px',
        }}
      >
        <motion.div
          animate={{
            x: showPanel ? 0 : '-100%',
            y: showPanel ? 0 : 20,
            zIndex: showPanel ? 2 : 1,
            rotateY: showPanel ? 0 : -15,
          }}
          initial={{ x: 0, y: 0, zIndex: 2 }}
          transition={{
            duration: 0.5,
            type: 'spring',
            stiffness: 120,
            damping: 20,
          }}
          style={{
            position: 'absolute',
            top: 30,
            left: 0,
            width: '100%',
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.5)',
            borderRadius: '10px',
          }}
        >
          <MobileUserInfoPanel
            user={user}
            nextShift={nextShift}
            coworkerCount={coworkerCount}
            upcomingShifts={upcomingShifts}
          />
          <FloatingBubbles
            bubbles={[
              {
                text: 'TimeCard',
                href: '/user/timecard-view',
                ...orangeBubbleColors,
              },
              { text: 'TimeCard', href: '/user/timecard-view' },
            ]}
            position={{ top: '200%', left: '30%' }}
            animationRange={{
              x: [0, -30, 40, 40, 80, 0],
              y: [0, 120, 30, -80, 100, 0],
              rotate: [0, 10, -5, 8, -3, 0],
              scale: [1, 1.05, 0.95, 1.03, 0.98, 1],
            }}
          />
          <FloatingBubbles
            bubbles={[
              {
                text: 'MyApp',
                href: '/user/my-page',
                ...icyBlueBubbleColors,
              },
              { text: 'MyApp', href: '/user/my-page' },
            ]}
            position={{ top: '230%', left: '80%' }}
            animationRange={{
              x: [0, -50, 20, -40, 100, 0],
              y: [0, 50, 60, 80, 60, 0],
              rotate: [0, 10, -5, 8, -3, 0],
              scale: [1, 1.05, 0.95, 1.03, 0.98, 1],
            }}
          />
        </motion.div>
        <motion.div
          animate={{
            x: showPanel ? 0 : '100%',
            y: showPanel ? 20 : 0,
            zIndex: showPanel ? 1 : 2,
            rotateY: showPanel ? 15 : 0,
          }}
          initial={{ x: 0, y: 0, zIndex: 1 }}
          transition={{
            duration: 0.5,
            type: 'spring',
            stiffness: 120,
            damping: 20,
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            borderRadius: '10px',
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.5)',
          }}
        >
          <MobileShiftViewTable
            users={users}
            year={year}
            month={month}
            currentUserId={user.id}
          />
        </motion.div>
      </Box>
    </MobileFlexColumnContainer>
  );
}
