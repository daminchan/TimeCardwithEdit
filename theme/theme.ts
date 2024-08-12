import { extendTheme } from '@chakra-ui/react';

const customTheme = extendTheme({
  styles: {
    global: {
      'html, body': {
        // background: 'gray.700',
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
        bg: 'purple.500',
        color: 'gray.100',
        _hover: { bg: 'purple.400' },
      },
    },
    Drawer: {
      baseStyle: {
        overlay: { bg: 'blackAlpha.300' },
        dialog: { bg: 'gray.700' },
        header: { color: 'gray.200', fontWeight: 'bold' },
        body: { color: 'gray.700' },
        closeButton: { color: 'gray.800' },
      },
    },
    FormLabel: {
      baseStyle: { color: 'white' },
    },
    Heading: {
      baseStyle: { color: 'gray.200' },
    },
    Input: {
      baseStyle: {
        field: {
          color: 'gray.200',
          bg: 'gray.700',
          _placeholder: { color: 'gray.400' },
          _hover: { bg: 'gray.600' },
          _focus: { bg: 'gray.600', borderColor: 'blue.300' },
        },
      },
    },
    Link: {
      baseStyle: {
        _hover: { textDecoration: 'none' },
      },
    },
    Modal: {
      baseStyle: {
        overlay: { bg: 'blackAlpha.600' },
        dialog: { bg: 'gray.700', color: 'gray.200' },
        header: { fontWeight: 'bold', fontSize: 'lg' },
        closeButton: {
          color: 'gray.400',
          _hover: { color: 'gray.200' },
        },
        body: { fontWeight: 'normal' },
        footer: { bg: 'gray.900' },
      },
    },
    ModalBody: {
      baseStyle: { color: 'gray.200' },
    },
    ModalContent: {
      baseStyle: { bg: 'gray.800' },
    },
    ModalFooter: {
      baseStyle: { bg: 'gray.900' },
    },
    ModalHeader: {
      baseStyle: { color: 'gray.200', fontWeight: 'bold' },
    },
    // Select: {
    //   baseStyle: {
    //     field: {
    //       color: 'gray.200',
    //       bg: 'gray.800',
    //       _hover: { bg: 'gray.700' },
    //       _focus: { bg: 'gray.700', borderColor: 'blue.300' },
    //     },
    //   },
    // },
    Select: {
      baseStyle: {
        field: {
          color: 'gray.200',
          bg: 'white',
          _hover: { bg: 'gray.400' },
          _focus: { bg: 'gray.400', borderColor: 'blue.100' },
        },
      },
      variants: {
        filled: {
          field: {
            color: 'gray.800',
            bg: 'white',
            _hover: { bg: 'gray.100' },
            _focus: { bg: 'gray.100', borderColor: 'blue.100' },
          },
        },
      },
    },
    Table: {
      baseStyle: {
        th: {
          color: 'gray.200',
          fontWeight: { base: 'bold', md: 'normal' },
        },
        td: {
          color: 'gray.200',
          fontWeight: { base: 'bold', md: 'normal' },
        },
      },
    },
    Text: {
      baseStyle: { color: 'gray.200' },
    },
  },
});

export default customTheme;

// export default customTheme;
// import { extendTheme } from '@chakra-ui/react';

// const customTheme = extendTheme({
//   styles: {
//     global: {
//       'html, body': {
//         background: 'linear-gradient(135deg, #6e8efb, #a777e3)',
//         color: 'gray.700',
//         height: '100vh',
//         margin: 0,
//         padding: 0,
//         justifyContent: 'center',
//         alignItems: 'center',
//       },
//     },
//   },
//   breakpoints: {
//     sm: '700px',
//     md: '768px',
//     lg: '960px',
//     xl: '1200px',
//   },

//   components: {
//     Heading: {
//       baseStyle: {
//         color: 'gray.200', // 基本的な文字色
//       },
//       sizes: {
//         xl: {
//           fontSize: ['3xl', '4xl'], // レスポンシブなフォントサイズ
//           lineHeight: 1.2,
//           fontWeight: 'bold',
//         },
//         // 他のサイズも必要に応じて定義
//       },
//       variants: {
//         page: {
//           borderBottom: '2px',
//           borderColor: 'gray.200',
//           paddingBottom: 2,
//           marginBottom: 6,
//         },
//       },
//       defaultProps: {
//         size: 'xl',
//       },
//     },
//     Button: {
//       baseStyle: {
//         borderRadius: 'lg',
//       },
//       variants: {
//         solid: {
//           bg: 'purple.500',
//           color: 'gray.100',
//           _hover: {
//             bg: 'purple.400',
//           },
//         },
//         primary: {
//           bg: 'blue.500',
//           color: 'white',
//           _hover: {
//             bg: 'blue.600',
//           },
//         },
//         secondary: {
//           bg: 'gray.200',
//           color: 'gray.800',
//           _hover: {
//             bg: 'gray.300',
//           },
//         },
//         danger: {
//           bg: 'red.500',
//           color: 'white',
//           _hover: {
//             bg: 'red.600',
//           },
//         },
//         customToast: {
//           bg: 'white',
//           color: 'gray.800',
//           _hover: {
//             bg: 'gray.100',
//           },
//           fontSize: 'sm',
//           fontWeight: 'bold',
//         },
//       },
//     },
//     Link: {
//       baseStyle: {
//         _hover: {
//           textDecoration: 'none',
//         },
//       },
//     },
//     Drawer: {
//       baseStyle: {
//         overlay: {
//           bg: 'blackAlpha.300', // オーバーレイの背景色
//         },
//         dialog: {
//           bg: 'gray.700', // Drawerの背景色
//         },
//         header: {
//           color: 'gray.200', // DrawerHeaderの文字色
//           fontWeight: 'bold',
//         },
//         body: {
//           color: 'gray.700', // DrawerBodyの文字色
//         },
//         closeButton: {
//           color: 'gray.800', // 閉じるボタンの色
//         },
//       },
//     },
//     Table: {
//       baseStyle: {
//         th: {
//           color: 'gray.200',
//           fontWeight: { base: 'bold', md: 'normal' },
//         },
//         td: {
//           color: 'gray.200',
//           fontWeight: { base: 'bold', md: 'normal' },
//         },
//       },
//       variants: {
//         simple: {
//           th: {
//             color: 'white', // 'simple' バリアントの th に白色を適用
//           },
//         },
//       },
//     },
//     FormLabel: {
//       baseStyle: {
//         color: 'white',
//       },
//     },
//     Input: {
//       baseStyle: {
//         field: {
//           color: 'gray.200', // 入力値の色
//           backgroundColor: 'gray.700', // 背景色
//           _placeholder: {
//             color: 'gray.200', // プレースホルダーの色
//           },
//         },
//       },
//       variants: {
//         filled: {
//           field: {
//             color: 'gray.200',
//             backgroundColor: 'gray.700',
//             _placeholder: { color: 'gray.200' },
//             _hover: {
//               backgroundColor: 'gray.600',
//             },
//             _focus: {
//               backgroundColor: 'gray.600',
//             },
//           },
//         },
//         // 他のバリアントも必要に応じて追加
//       },
//       defaultProps: {
//         variant: 'filled', // デフォルトのバリアントを 'filled' に設定
//       },
//     },
//     Text: {
//       baseStyle: {
//         color: 'gray.200',
//       },
//       variants: {
//         error: {
//           color: 'red.500',
//         },
//       },
//     },
//     Select: {
//       baseStyle: {
//         field: {
//           color: 'gray.200',
//           backgroundColor: 'gray.700',
//         },
//       },
//       variants: {
//         filled: {
//           field: {
//             color: 'gray.200',
//             backgroundColor: 'gray.800',
//             _hover: {
//               backgroundColor: 'gray.600',
//             },
//             _focus: {
//               backgroundColor: 'gray.600',
//             },
//           },
//         },
//       },
//       defaultProps: {
//         variant: 'filled',
//       },
//     },
//  option: {
//       baseStyle: {
//         bg: 'gray.700',
//         color: 'gray.200',
//         _hover: {
//           bg: 'gray.600',
//         },
//         _focus: {
//           bg: 'gray.600',
//         },
//       },
//     },
//     Modal: {
//       baseStyle: {
//         overlay: {
//           bg: 'blackAlpha.600',
//         },
//         dialog: {
//           bg: 'gray.700',
//           color: 'gray.200',
//         },
//         header: {
//           fontWeight: 'bold',
//           fontSize: 'lg',
//         },
//         closeButton: {
//           color: 'gray.400',
//           _hover: {
//             color: 'gray.200',
//           },
//         },
//         body: {
//           fontWeight: 'normal',
//         },
//         footer: {
//           bg: 'gray.900',
//         },
//       },
//     },

//     ModalContent: {
//       baseStyle: {
//         bg: 'gray.800',
//       },
//     },

//     ModalHeader: {
//       baseStyle: {
//         color: 'gray.200',
//         fontWeight: 'bold',
//       },
//     },

//     ModalBody: {
//       baseStyle: {
//         color: 'gray.200',
//       },
//     },

//     ModalFooter: {
//       baseStyle: {
//         bg: 'gray.900',
//       },
//     },
//   },
// });

// export default customTheme;
