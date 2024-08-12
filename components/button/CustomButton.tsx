import { Button, ButtonProps } from '@chakra-ui/react';

interface CustomButtonProps extends ButtonProps {
  backgroundColor?: string;
  hoverBackgroundColor?: string;
  activeBackgroundColor?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  backgroundColor = '#5a7df9', // 明るい青紫色
  hoverBackgroundColor = '#5a7df9', // やや暗い青紫色
  activeBackgroundColor = '#829ffc',
  ...props
}) => {
  return (
    <Button
      bg={backgroundColor}
      size="lg"
      color="white"
      w="100%"
      transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
      _hover={{
        bg: hoverBackgroundColor,
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
      _active={{
        bg: activeBackgroundColor,
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
