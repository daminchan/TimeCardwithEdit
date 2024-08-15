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

import LandscapeMobileShiftTable from '../mobile/LandscapeMobileShiftTable';
import LandscapeViewport from '@/components/ui/LandscapeViewport';

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
    <Box>
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
          shadow="lg"
          p={isMobile ? 4 : 6}
          maxWidth="100%"
          overflow="hidden"
        >
          <Box
            overflowX={isMobile && isLandscape ? 'auto' : 'visible'}
            overflowY="auto"
            maxHeight={isMobile && isLandscape ? 'calc(100vh - 150px)' : 'auto'}
          >
            {isMobile ? (
              isLandscape ? (
                <LandscapeViewport>
                  <LandscapeMobileShiftTable
                    users={users}
                    year={year}
                    month={month}
                  />
                </LandscapeViewport>
              ) : (
                <MobileShiftEditTable users={users} year={year} month={month} />
              )
            ) : (
              <ShiftEditTable users={users} year={year} month={month} />
            )}
          </Box>
        </Box>
      </Flex>
    </Box>

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
