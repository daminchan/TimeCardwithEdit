import { Button, Flex, FlexProps } from '@chakra-ui/react';

export interface ToggleButtonOption {
  label: string;
  onClick: () => void;
  isDisabled: boolean;
  colorScheme?: string;
}

interface MobileToggleButtonProps extends FlexProps {
  options: [ToggleButtonOption, ToggleButtonOption];
}

export default function MobileToggleButton({
  options,
  ...flexProps
}: MobileToggleButtonProps) {
  return (
    <Flex justifyContent="space-between" gap={4} {...flexProps}>
      {options.map((option, index) => (
        <Button
          key={index}
          flex={1}
          size="lg"
          height="60px"
          fontSize="xl"
          colorScheme={option.colorScheme || (index === 0 ? 'blue' : 'red')}
          onClick={option.onClick}
          isDisabled={option.isDisabled}
        >
          {option.label}
        </Button>
      ))}
    </Flex>
  );
}
