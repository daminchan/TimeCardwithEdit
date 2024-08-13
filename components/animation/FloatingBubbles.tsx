'use client';
import React, { useState, useCallback } from 'react';

import { Box } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

import FloatingBubble from './FloatingBubble';

interface AnimationRange {
  x: number[];
  y: number[];
  rotate: number[];
  scale: number[];
}

interface BubbleData {
  text: string;
  href: string;
  color1?: string; // 枠の色
  color2?: string; // センターの色
  color3?: string; // 追加の色（オレンジっぽい色用）
}

interface FloatingBubblesProps {
  bubbles: BubbleData[];
  position?: { top?: string; left?: string; right?: string; bottom?: string };
  animationRange?: AnimationRange;
}

const defaultAnimationRange: AnimationRange = {
  x: [0, 50, 20, 100, 10, 0],
  y: [0, -100, 15, 80, 10, 0],
  rotate: [0, 10, -5, 8, -3, 0],
  scale: [1, 1.05, 0.95, 1.03, 0.98, 1],
};
const defaultPosition = { top: '0', left: '0' };

export default function FloatingBubbles({
  bubbles,
  position = defaultPosition,
  animationRange = defaultAnimationRange,
}: FloatingBubblesProps) {
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const router = useRouter();

  const handleBubbleClick = useCallback(
    (index: number) => {
      setClickedIndex(index);

      setTimeout(() => {
        router.push(bubbles[index].href);
      }, 600);
    },
    [bubbles, router]
  );

  return (
    <Box
      position="absolute"
      width="100%"
      height="100%"
      top={position.top}
      left={position.left}
      right={position.right}
      bottom={position.bottom}
      transform="translate(-50%, -50%)"
    >
      <motion.div
        animate={{
          x: animationRange.x,
          y: animationRange.y,
          rotate: animationRange.rotate,
          scale: animationRange.scale,
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {bubbles.map((bubble, index) => (
          <Box
            key={index}
            position="absolute"
            top="30%"
            left="30%"
            transform="translate(-50%, -50%)"
            zIndex={bubbles.length - index}
          >
            <AnimatePresence>
              {clickedIndex === null || index >= clickedIndex ? (
                <motion.div
                  initial={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  animate={
                    clickedIndex !== null
                      ? index === 0
                        ? {
                            scale: [1, 1, 1],
                            opacity: [1, 1, 0],
                            filter: ['blur(0px)', 'blur(5px)', 'blur(10px)'],
                            transition: { duration: 0.5, times: [0, 0.2, 1] },
                          }
                        : {
                            scale: [1, 1.2],
                            opacity: [1, 0],
                            filter: ['blur(0px)', 'blur(10px)'],
                            transition: {
                              duration: 0.5,
                            },
                          }
                      : {}
                  }
                  exit={{
                    opacity: 0,
                    scale: 0,
                    filter: 'blur(10px)',
                    transition: { duration: 0.3 },
                  }}
                >
                  <FloatingBubble
                    text={bubble.text}
                    href={bubble.href}
                    size={150}
                    onClick={() => handleBubbleClick(index)}
                    color1={bubble.color1 || 'rgba(255, 255, 255, 0.4)'}
                    color2={bubble.color2 || 'rgba(255, 255, 255, 0.5)'}
                    color3={bubble.color3 || 'rgba(255, 255, 255, 0.4)'}
                  />
                </motion.div>
              ) : null}
            </AnimatePresence>
          </Box>
        ))}
      </motion.div>
    </Box>
  );
}

// // 'use client';

// // import React, { useState, useCallback } from 'react';
// // import { Box, Flex } from '@chakra-ui/react';
// // import { motion, AnimatePresence } from 'framer-motion';

// // import FloatingBubble from './FloatingBubble';
// // import { useRouter } from 'next/navigation';

// // interface AnimationRange {
// //   x: number[];
// //   y: number[];
// //   rotate: number[];
// //   scale: number[];
// // }

// // interface BubbleData {
// //   text: string;
// //   href: string;
// //   animationRange?: AnimationRange;
// //   position?: { top: string; left: string };
// //   color1?: string; // 枠の色
// //   color2?: string; // センターの色
// //   color3?: string; // 追加の色（オレンジっぽい色用）
// // }

// // interface FloatingBubblesProps {
// //   bubbles: BubbleData[];
// // }

// // const defaultAnimationRange: AnimationRange = {
// //   x: [0, 50, 20, 100, 10, 0],
// //   y: [0, -100, 15, 80, 10, 0],
// //   rotate: [0, 10, -5, 8, -3, 0],
// //   scale: [1, 1.05, 0.95, 1.03, 0.98, 1],
// // };

// // const defaultPosition = { top: '50%', left: '50%' };
// // const defaultColor = 'blue.500';

// // export default function FloatingBubbles({ bubbles }: FloatingBubblesProps) {
// //   const [clickedIndex, setClickedIndex] = useState<number | null>(null);
// //   const router = useRouter();

// //   const handleBubbleClick = useCallback(
// //     (index: number) => {
// //       setClickedIndex(index);

// //       setTimeout(() => {
// //         router.push(bubbles[index].href);
// //       }, 600);
// //     },
// //     [bubbles, router]
// //   );

// //   return (
// //     <Box position="relative" width="100%" height="100%" minHeight="300px">
// //       {bubbles.map((bubble, index) => (
// //         <Box
// //           key={index}
// //           position="absolute"
// //           top={bubble.position?.top || defaultPosition.top}
// //           left={bubble.position?.left || defaultPosition.left}
// //           transform="translate(-50%, -50%)"
// //         >
// //           <AnimatePresence>
// //             {clickedIndex === null || index >= clickedIndex ? (
// //               <motion.div
// //                 initial={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
// //                 animate={
// //                   clickedIndex !== null
// //                     ? index === clickedIndex
// //                       ? {
// //                           scale: [1, 1, 1],
// //                           opacity: [1, 1, 0],
// //                           filter: ['blur(0px)', 'blur(5px)', 'blur(10px)'],
// //                           transition: { duration: 0.5, times: [0, 0.2, 1] },
// //                         }
// //                       : {
// //                           scale: [1, 1.2],
// //                           opacity: [1, 0],
// //                           filter: ['blur(0px)', 'blur(10px)'],
// //                           transition: {
// //                             duration: 0.5,
// //                           },
// //                         }
// //                     : {}
// //                 }
// //                 exit={{
// //                   opacity: 0,
// //                   scale: 0,
// //                   filter: 'blur(10px)',
// //                   transition: { duration: 0.3 },
// //                 }}
// //               >
// //                 <FloatingBubble
// //                   text={bubble.text}
// //                   href={bubble.href}
// //                   size={150}
// //                   onClick={() => handleBubbleClick(index)}
// //                   animationRange={
// //                     bubble.animationRange || defaultAnimationRange
// //                   }
// //                   color1={bubble.color1 || 'rgba(100, 150, 255, 0.4)'}
// //                   color2={bubble.color2 || 'rgba(150, 200, 255, 0.5)'}
// //                   color3={bubble.color3 || 'rgba(255, 200, 100, 0.4)'}
// //                 />
// //               </motion.div>
// //             ) : null}
// //           </AnimatePresence>
// //         </Box>
// //       ))}
// //     </Box>
// //   );
// // }

// 'use client';
// import React, { useState, useCallback } from 'react';
// import { Box } from '@chakra-ui/react';
// import { motion, AnimatePresence } from 'framer-motion';

// import FloatingBubble from './FloatingBubble';
// import { useRouter } from 'next/navigation';

// interface AnimationRange {
//   x: number[];
//   y: number[];
//   rotate: number[];
//   scale: number[];
// }

// interface BubbleData {
//   text: string;
//   href: string;
//   animationRange?: AnimationRange;
//   color1?: string; // 枠の色
//   color2?: string; // センターの色
//   color3?: string; // 追加の色（オレンジっぽい色用）
// }

// interface FloatingBubblesProps {
//   bubbles: BubbleData[];
//   position?: { top?: string; left?: string; right?: string; bottom?: string };
// }

// const defaultAnimationRange: AnimationRange = {
//   x: [0, 50, 20, 100, 10, 0],
//   y: [0, -100, 15, 80, 10, 0],
//   rotate: [0, 10, -5, 8, -3, 0],
//   scale: [1, 1.05, 0.95, 1.03, 0.98, 1],
// };
// const defaultPosition = { top: '0', left: '0' };

// export default function FloatingBubbles({
//   bubbles,
//   position = defaultPosition,
// }: FloatingBubblesProps) {
//   const [clickedIndex, setClickedIndex] = useState<number | null>(null);
//   const router = useRouter();

//   const handleBubbleClick = useCallback(
//     (index: number) => {
//       setClickedIndex(index);

//       setTimeout(() => {
//         router.push(bubbles[index].href);
//       }, 600);
//     },
//     [bubbles, router]
//   );

//   return (
//     <Box
//       position="absolute"
//       width="100%"
//       height="100%"
//       top={position.top}
//       left={position.left}
//       right={position.right}
//       bottom={position.bottom}
//       transform="translate(-50%, -50%)"
//     >
//       {bubbles.map((bubble, index) => (
//         <Box
//           key={index}
//           position="absolute"
//           top="30%"
//           left="30%"
//           transform="translate(-50%, -50%)"
//           zIndex={bubbles.length - index}
//         >
//           <AnimatePresence>
//             {clickedIndex === null || index >= clickedIndex ? (
//               <motion.div
//                 initial={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
//                 animate={
//                   clickedIndex !== null
//                     ? index === 0
//                       ? {
//                           scale: [1, 1, 1],
//                           opacity: [1, 1, 0],
//                           filter: ['blur(0px)', 'blur(5px)', 'blur(10px)'],
//                           transition: { duration: 0.5, times: [0, 0.2, 1] },
//                         }
//                       : {
//                           scale: [1, 1.2],
//                           opacity: [1, 0],
//                           filter: ['blur(0px)', 'blur(10px)'],
//                           transition: {
//                             duration: 0.5,
//                           },
//                         }
//                     : {}
//                 }
//                 exit={{
//                   opacity: 0,
//                   scale: 0,
//                   filter: 'blur(10px)',
//                   transition: { duration: 0.3 },
//                 }}
//               >
//                 <FloatingBubble
//                   text={bubble.text}
//                   href={bubble.href}
//                   size={150}
//                   onClick={() => handleBubbleClick(index)}
//                   animationRange={bubble.animationRange}
//                   color1={bubble.color1 || 'rgba(255, 255, 255, 0.4)'}
//                   color2={bubble.color2 || 'rgba(255, 255, 255, 0.5)'}
//                   color3={bubble.color3 || 'rgba(255, 255, 255, 0.4)'}
//                 />
//               </motion.div>
//             ) : null}
//           </AnimatePresence>
//         </Box>
//       ))}
//     </Box>
//   );
// }
