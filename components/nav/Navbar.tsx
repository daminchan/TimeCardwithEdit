import { Flex, Box } from '@chakra-ui/react';

import { auth } from '@/auth';

import ClientNavbar from './ClientNavbar';
import NavButton from '../button/NavButton';

const Navbar = async () => {
  const session = await auth();
  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
    >
      <Box>
        <NavButton href="/">ホーム</NavButton>
      </Box>
      <ClientNavbar session={session} />
    </Flex>
  );
};

export default Navbar;
