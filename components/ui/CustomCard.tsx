import { Box, BoxProps } from '@chakra-ui/react';

interface CustomCardProps extends BoxProps {
  // 追加のプロパティがあればここに定義
}

export const CustomCard: React.FC<CustomCardProps> = ({
  children,
  ...props
}) => {
  return (
    <Box
      shadow="md"
      borderRadius="lg"
      p={8}
      bg="rgba(255, 255, 255, 0.2)"
      {...props}
    >
      {children}
    </Box>
  );
};
