import { Box, keyframes } from '@chakra-ui/react';

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

type StatusIndicatorProps = {
  isActive?: boolean; // オプショナルにする
  activeText: string;
  inactiveText: string;
  activeColor?: string;
  inactiveColor?: string;
};

export default function StatusIndicator({
  isActive = false, // デフォルト値を設定
  activeText,
  inactiveText,
  activeColor = 'green.500',
  inactiveColor = 'gray.500',
}: StatusIndicatorProps) {
  return (
    <Box
      fontSize="4xl"
      fontWeight="bold"
      color="white"
      bg={isActive ? activeColor : inactiveColor}
      textAlign="center"
      py={6}
      px={8}
      borderRadius="full"
      boxShadow="lg"
      animation={isActive ? `${blink} 2s infinite` : undefined}
    >
      {isActive ? activeText : inactiveText}
    </Box>
  );
}
