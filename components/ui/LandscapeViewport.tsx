import React from 'react';

import { Box } from '@chakra-ui/react';

interface LandscapeViewportProps {
  children: React.ReactNode;
}

const LandscapeViewport: React.FC<LandscapeViewportProps> = ({ children }) => {
  return (
    <Box
      width="100vh"
      height="100vw"
      maxWidth="100%"
      maxHeight="100%"
      position="relative"
      overflow="hidden"
    >
      <Box
        width="100vw"
        height="100vh"
        position="absolute"
        top="100%"
        left="0"
        transform="rotate(-90deg)"
        transformOrigin="top left"
        overflowY="auto"
        overflowX="hidden"
      >
        {children}
      </Box>
    </Box>
  );
};

export default LandscapeViewport;
