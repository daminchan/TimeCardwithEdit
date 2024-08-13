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

type MobileMyPageViewProps = {
  user: User;
  nextShift: Shift | null;
  coworkerCount: number;
  upcomingShifts: Shift[];
  users: ShiftTableUser[];
  year: number;
  month: number;
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
  return (
    <MobileFlexColumnContainer>
      <Heading as="h1" size="xl" textAlign="center">
        マイページ
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
            // height: "100%",
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.5)',
            borderRadius: '10px',
            // background: 'rgba(255, 255, 255, 0.5)',
          }}
        >
          <MobileUserInfoPanel
            user={user}
            nextShift={nextShift}
            coworkerCount={coworkerCount}
            upcomingShifts={upcomingShifts}
          />
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
            // background: 'rgba(255, 255, 255, 0.5)',
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
