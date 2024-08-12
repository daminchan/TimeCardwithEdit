'use client';

import React, { useState } from 'react';

import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading, IconButton, Text } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';

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

  if (!user.id) {
    return (
      <MobileFlexColumnContainer>
        <Text>ユーザーIDが見つかりません。</Text>
      </MobileFlexColumnContainer>
    );
  }

  return (
    <MobileFlexColumnContainer>
      <Heading as="h1" size="xl" textAlign="center" mb={4}>
        {user.name || 'ユーザー'}のタイムカード
      </Heading>
      <Flex justifyContent="center" mt={4}>
        <IconButton
          aria-label={showPanel ? '履歴を表示' : 'パネルを表示'}
          icon={showPanel ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          onClick={() => setShowPanel(!showPanel)}
          size="lg"
        />
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
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.5)',
            borderRadius: '10px',
            // background: 'rgba(255, 255, 255, 0.5)',
          }}
        >
          <MobileTimeCardPanel latestEntry={latestEntry} userId={user.id} />
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
