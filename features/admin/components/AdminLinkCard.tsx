import { Box, Heading, Link } from '@chakra-ui/react';

interface AdminLinkCardProps {
  title: string;
  href: string;
}

const AdminLinkCard: React.FC<AdminLinkCardProps> = ({ title, href }) => {
  return (
    <Link href={href} _hover={{ textDecoration: 'none' }}>
      <Box
        color={'whitesmoke'}
        borderWidth="1px"
        borderRadius="lg"
        p={6}
        boxShadow="md"
        transition="all 0.3s"
        _hover={{ transform: 'translateY(-5px)', boxShadow: 'lg' }}
      >
        <Heading size="md" textAlign="center">
          {title}
        </Heading>
      </Box>
    </Link>
  );
};

export default AdminLinkCard;
