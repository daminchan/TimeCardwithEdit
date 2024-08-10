import { extendTheme } from '@chakra-ui/react';

const customTheme = extendTheme({
  styles: {
    global: {
      'html, body': {
        background: 'linear-gradient(135deg, #6e8efb, #a777e3)',
        color: 'gray.700',
        height: '100vh',
        margin: 0,
        padding: 0,
        justifyContent: 'center',
        alignItems: 'center',
      },
    },
  },
  breakpoints: {
    sm: '700px',
    md: '768px',
    lg: '960px',
    xl: '1200px',
  },

  components: {
    Button: {
      baseStyle: {
        borderRadius: 'lg',
      },
      variants: {
        solid: {
          bg: 'purple.500',
          color: 'gray.100',
          _hover: {
            bg: 'purple.400',
          },
        },
        primary: {
          bg: 'blue.500',
          color: 'white',
          _hover: {
            bg: 'blue.600',
          },
        },
        secondary: {
          bg: 'gray.200',
          color: 'gray.800',
          _hover: {
            bg: 'gray.300',
          },
        },
        danger: {
          bg: 'red.500',
          color: 'white',
          _hover: {
            bg: 'red.600',
          },
        },
        customToast: {
          bg: 'white',
          color: 'gray.800',
          _hover: {
            bg: 'gray.100',
          },
          fontSize: 'sm',
          fontWeight: 'bold',
        },
      },
    },
  },
});

export default customTheme;
