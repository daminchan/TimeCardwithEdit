'use client';

import { Box, keyframes } from '@chakra-ui/react';

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

type MobileStatusIndicatorProps = {
  isActive?: boolean;
  activeText: string;
  inactiveText: string;
  activeColor?: string;
  inactiveColor?: string;
};

export default function MobileStatusIndicator({
  isActive = false,
  activeText,
  inactiveText,
  activeColor = 'green.500',
  inactiveColor = 'gray.500',
}: MobileStatusIndicatorProps) {
  return (
    <Box
      fontSize="2xl"
      fontWeight="bold"
      color="white"
      bg={isActive ? activeColor : inactiveColor}
      textAlign="center"
      py={3}
      px={4}
      borderRadius="full"
      boxShadow="md"
      animation={isActive ? `${blink} 2s infinite` : undefined}
    >
      {isActive ? activeText : inactiveText}
    </Box>
  );
}
