'use client';

import React, { useState } from 'react';

import {
  Box,
  Heading,
  Flex,
  Link,
  useBreakpointValue,
  Button,
} from '@chakra-ui/react';

import { MdScreenRotation } from 'react-icons/md';

import ShiftEditTable from './ShiftEditTable';
import MobileShiftEditTable from '../mobile/MobileShiftEditTable';
import { User } from '../types';
import MobileLandscapeShiftTable from '../mobile/MobileLandscapeShiftTable';

interface ShiftEditPageContentProps {
  users: User[];
  year: number;
  month: number;
}

export default function ShiftEditPageContent({
  users,
  year,
  month,
}: ShiftEditPageContentProps) {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [isLandscape, setIsLandscape] = useState(false);

  const toggleLandscape = () => {
    setIsLandscape(!isLandscape);
  };

  return (
    <Flex direction="column" gap={6} width="100%">
      <Flex justifyContent="space-between" alignItems="center">
        <Heading
          as="h1"
          size={isMobile ? 'lg' : 'xl'}
          textAlign={isMobile ? 'center' : 'left'}
        >
          シフト一覧
        </Heading>
        {isMobile && (
          <Button
            leftIcon={<MdScreenRotation />}
            onClick={toggleLandscape}
            size="sm"
          >
            {isLandscape ? '縦向き' : '横向き'}
          </Button>
        )}
      </Flex>
      <Box
        borderRadius="lg"
        shadow="md"
        p={isMobile ? 4 : 6}
        overflowX={isLandscape ? 'auto' : 'visible'}
      >
        {isMobile ? (
          isLandscape ? (
            <MobileLandscapeShiftTable
              users={users}
              year={year}
              month={month}
            />
          ) : (
            <MobileShiftEditTable users={users} year={year} month={month} />
          )
        ) : (
          <ShiftEditTable users={users} year={year} month={month} />
        )}
      </Box>
    </Flex>
    // <Flex direction="column" gap={6} width="100%">
    //   <Heading
    //     as="h1"
    //     size={isMobile ? 'lg' : 'xl'}
    //     textAlign={isMobile ? 'center' : 'left'}
    //   >
    //     シフト一覧
    //   </Heading>
    //   <Box borderRadius="lg" shadow="md" p={isMobile ? 4 : 6}>
    //     {isMobile ? (
    //       <MobileShiftEditTable users={users} year={year} month={month} />
    //     ) : (
    //       <ShiftEditTable users={users} year={year} month={month} />
    //     )}
    //   </Box>
    // </Flex>
  );
}
