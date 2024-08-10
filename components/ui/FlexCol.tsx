import { Flex, FlexProps } from '@chakra-ui/react';

const FlexCol = (props: FlexProps) => (
  <Flex
    direction="column"
    gap={4}
    align="center"
    justify="center"
    py={6}
    minW={400}
    {...props}
  />
);

export default FlexCol;
