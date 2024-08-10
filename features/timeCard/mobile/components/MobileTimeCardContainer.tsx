'use client';

import React from 'react';

import { Flex } from '@chakra-ui/react';

interface MobileTimeCardContainerProps {
  children: React.ReactNode;
}

export default function MobileTimeCardContainer({
  children,
}: MobileTimeCardContainerProps) {
  return (
    <Flex
      bg="rgba(255, 255, 255, 0.2)"
      minHeight="100vh"
      px={4}
      py={6}
      flexDirection="column"
      gap={6}
    >
      {children}
    </Flex>
  );
}
