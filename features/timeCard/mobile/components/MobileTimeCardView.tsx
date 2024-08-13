'use client';

import React, { useState } from 'react';

import {
  ArrowBackIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';
import { Box, Button, Flex, Heading, IconButton, Text } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';

import FloatingBubble from '@/components/animation/FloatingBubble';
import FloatingBubbles from '@/components/animation/FloatingBubbles';
import MobileFlexColumnContainer from '@/components/ui/MobileFlexColumnContainer';

import MobileTimeCardPanel from './MobileTimeCardPanel';
import MobileTimeCardViewTable from './MobileTimeCardViewTable';
import { TimeCardViewProps } from '../../types';

export default function MobileTimeCardView({
  user,
  latestEntry,
  entries,
}: TimeCardViewProps) {
  const [showPanel, setShowPanel] = useState(true);
  const [isClicked, setIsClicked] = useState(false);

  const handleTogglePanel = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
      setShowPanel(!showPanel);
    }, 100);
  };
  if (!user.id) {
    return (
      <MobileFlexColumnContainer>
        <Text>ユーザーIDが見つかりません。</Text>
      </MobileFlexColumnContainer>
    );
  }

  return (
    <MobileFlexColumnContainer>
      <Heading as="h1" size="xl" textAlign="center">
        {user.name || 'ユーザー'}のタイムカード
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
        position="relative"
        borderColor="gray.200"
        borderRadius="lg"
        minHeight="300px"
      >
        <motion.div
          animate={{
            x: showPanel ? '3%' : '-100%',
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
            left: -10,
            width: '100%',

            // height: "100%",
            // boxShadow: '0 6px 12px rgba(0, 0, 0, 0.5)',
            // borderRadius: '10px',
            // background: 'rgba(255, 255, 255, 0.5)',
          }}
        >
          <MobileTimeCardPanel latestEntry={latestEntry} userId={user.id} />
          <FloatingBubble
            text="MyPage"
            href="/user/my-page"
            size={150}
            position={{ bottom: -100, left: 10 }} // 値を小さくする position={{ bottom: 100, left: 1 }}
            // アニメーションの範囲をカスタマイズする場合は以下のようにプロパティを渡します
            animationRange={{
              x: [0, 50, 20, 100, 10, 0],
              y: [0, -100, 15, 80, 10, 0],
              rotate: [0, 10, -5, 8, -3, 0],
              scale: [1, 1.05, 0.95, 1.03, 0.98, 1],
            }}
          />
          <FloatingBubble
            text="App"
            href="/user/timecard-view"
            size={150}
            position={{ bottom: -80, left: 60 }}
            animationRange={{
              //水平方向の動き（左右）正の値：右方向 負の値：左方向
              x: [0, -30, 40, 40, 80, 0],
              //y: 垂直方向の動き（上下）正の値：下方向 負の値：上方向
              y: [0, 120, 30, -80, 100, 0],
              rotate: [0, 10, -5, 8, -3, 0],
              scale: [1, 1.05, 0.95, 1.03, 0.98, 1],
            }}
          />

          {/* <Box
            position="absolute"
            bottom="-300px"
            left="100px"
            width="180px"
            height="180px"
          > */}
          {/* <motion.div
              animate={{
                y: [0, -15, 10, -25, 5, -10, 20, -5, 15, -20, 0],
                x: [0, -10, -15, 20, -5, 25, -10, 15, -20, 5, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'easeInOut',
                times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
              }}
            >
              <motion.div
                animate={{
                  rotate: [0, 5, -3, 2, -4, 3, -2, 4, -5, 1, 0],
                  scale: [
                    1, 1.02, 0.98, 1.03, 0.99, 1.01, 0.97, 1.02, 0.98, 1.01, 1,
                  ],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
                }}
              >
                <Link href="/user/my-page">
                  <Box
                    fontSize="xl"
                    overflow="hidden"
                    fontWeight="bold"
                    bg="transparent"
                    borderRadius="full"
                    width="150px"
                    height="150px"
                    // boxShadow="0 0 15px rgba(255, 165, 0, 0.3), inset 0 0 15px rgba(255, 165, 0, 0.3)"
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
                    }}
                    _hover={{
                      transform: 'scale(1.05)',
                      boxShadow:
                        '0 0 20px rgba(255, 255, 255, 0.7), inset 0 0 20px rgba(255, 255, 255, 0.7)',
                    }}
                    transition="all 0.3s"
                  >
                    <Text
                      position="absolute"
                      top="50%"
                      left="50%"
                      transform="translate(-50%, -50%)"
                      fontSize="2xl"
                      fontWeight="bold"
                      color="white"
                      textShadow="0 0 5px rgba(0, 0, 0, 0.5)"
                    >
                      MyPage
                    </Text>
                  </Box>
                </Link>
              </motion.div>
            </motion.div> */}
          {/* </Box> */}
        </motion.div>
        <motion.div
          animate={{
            x: showPanel ? 0 : '100%',
            y: showPanel ? 20 : 0,
            zIndex: showPanel ? 1 : 2,
            rotateY: showPanel ? 15 : 0,
          }}
          initial={{ x: '5%', y: 20, zIndex: 1 }}
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
            // height: "100%",
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.5)',
            borderRadius: '10px',
            // background: 'rgba(255, 255, 255, 0.2)',
          }}
        >
          <MobileTimeCardViewTable entries={entries} />
        </motion.div>
      </Box>
    </MobileFlexColumnContainer>
  );
}
