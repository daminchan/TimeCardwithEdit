import { Box, Flex, Heading, Link } from '@chakra-ui/react';

import FloatingBubbles from '@/components/animation/FloatingBubbles';
import MobileFlexColumnContainer from '@/components/ui/MobileFlexColumnContainer';

export default function Home() {
  return (
    <MobileFlexColumnContainer>
      <Flex direction="column" gap={8} width="100%" alignItems="center">
        <Heading as="h1" size="xl" textAlign="center">
          ようこそ
        </Heading>

        <Box position="relative" width="100%" height="300px">
          <Flex justifyContent="space-around" width="100%">
            <Box width="45%" height="100%">
              <FloatingBubbles
                bubbles={[
                  { text: 'MyPage', href: '/user/my-page' },
                  { text: 'MyPage', href: '/user/settings' },
                ]}
                position={{ top: '200%', left: '30%' }}
                animationRange={{
                  x: [0, -30, 40, 40, 80, 0],
                  y: [0, 120, 30, -80, 100, 0],
                  rotate: [0, 10, -5, 8, -3, 0],
                  scale: [1, 1.05, 0.95, 1.03, 0.98, 1],
                }}
              />
            </Box>
          </Flex>
        </Box>
      </Flex>
    </MobileFlexColumnContainer>
  );
}
