import { Button, ButtonProps } from '@chakra-ui/react';

interface CustomButtonProps extends ButtonProps {
  // 必要に応じて追加のプロパティを定義できます
}

const CustomButton: React.FC<CustomButtonProps> = ({ children, ...props }) => {
  return (
    <Button
      colorScheme="gray"
      size="lg"
      color="white"
      w="100%"
      transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
      _hover={{
        bg: 'gray.200',
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
      _active={{
        bg: 'gray.300',
        transform: 'translateY(0)',
        boxShadow: 'inset 0 3px 5px rgba(0, 0, 0, 0.1)',
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
