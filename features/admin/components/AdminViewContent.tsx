'use client';

import React from 'react';

import { Box, SimpleGrid, useBreakpointValue, Flex } from '@chakra-ui/react';

import AdminLinkCard from './AdminLinkCard';

interface LinkCard {
  title: string;
  href: string;
}

interface AdminViewContentProps {
  linkCards: LinkCard[];
}

const AdminViewContent: React.FC<AdminViewContentProps> = ({ linkCards }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  const content = (
    <>
      {linkCards.map((card, index) => (
        <AdminLinkCard key={index} title={card.title} href={card.href} />
      ))}
    </>
  );

  if (isMobile) {
    return (
      <Box p={8}>
        <Flex direction="column" gap={8}>
          {content}
        </Flex>
      </Box>
    );
  }

  return (
    <Box p={8}>
      <SimpleGrid columns={3} spacing={8}>
        {content}
      </SimpleGrid>
    </Box>
  );
};

export default AdminViewContent;
