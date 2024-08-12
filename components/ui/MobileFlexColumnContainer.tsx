'use client';

import React from 'react';

import { Flex, FlexProps } from '@chakra-ui/react';

interface MobileFlexColumnContainerProps extends FlexProps {
  children: React.ReactNode;
}

export default function MobileFlexColumnContainer({
  children,
  ...props
}: MobileFlexColumnContainerProps) {
  return (
    <Flex
      minHeight="100vh"
      px={4}
      py={6}
      flexDirection="column"
      gap={6}
      {...props}
    >
      {children}
    </Flex>
  );
}
