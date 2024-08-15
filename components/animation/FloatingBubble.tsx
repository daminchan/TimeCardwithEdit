'use client';
import React, { useRef, useEffect, useState } from 'react';

import { Box, Text } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';

interface FloatingBubbleProps {
  text: string;
  href: string;
  size?: number;
  position?: { bottom: string | number; left: string | number };
  animationRange?: {
    x: number[];
    y: number[];
    rotate: number[];
    scale: number[];
  };
  onClick?: (href: string) => void;
  color1?: string; // 枠の色
  color2?: string; // センターの色
  color3?: string; // 追加の色（オレンジっぽい色用）
}

const defaultAnimationRange = {
  x: [0, -10, -15, 20, -5, 25, -10, 15, -20, 5, 0],
  y: [0, -15, 10, -25, 5, -10, 20, -5, 15, -20, 0],
  rotate: [0, 5, -3, 2, -4, 3, -2, 4, -5, 1, 0],
  scale: [1, 1.02, 0.98, 1.03, 0.99, 1.01, 0.97, 1.02, 0.98, 1.01, 1],
};

const defaultColor1 = 'rgba(255, 255, 255, 0.4)';
const defaultColor2 = 'rgba(255, 255, 255, 0.5)';
const defaultColor3 = 'rgba(255, 255, 255, 0.4)';

export default function FloatingBubble({
  text,
  href,
  size = 150,
  position = { bottom: '10%', left: '10%' },
  animationRange = defaultAnimationRange,
  onClick,
  color1 = defaultColor1,
  color2 = defaultColor2,
  color3 = defaultColor3,
}: FloatingBubbleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const parent = containerRef.current.parentElement;
        if (parent) {
          setContainerSize({
            width: parent.clientWidth,
            height: parent.clientHeight,
          });
        }
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    const timer = setTimeout(() => setIsVisible(true), 500);

    return () => {
      window.removeEventListener('resize', updateSize);
      clearTimeout(timer);
    };
  }, []);

  const bottomPosition =
    typeof position.bottom === 'number'
      ? `${(position.bottom / 100) * containerSize.height}px`
      : position.bottom;
  const leftPosition =
    typeof position.left === 'number'
      ? `${(position.left / 100) * containerSize.width}px`
      : position.left;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
      if (onClick) {
        onClick(href);
      } else {
        window.location.href = href;
      }
    }, 100);
  };

  return (
    <Box
      ref={containerRef}
      position="absolute"
      bottom={bottomPosition}
      left={leftPosition}
      width={`${size}px`}
      height={`${size}px`}
      overflow="visible" // この行を追加
      background="transparent" // この行を追加
    >
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.5, filter: 'blur(10px)' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{ width: '100%', height: '100%' }} // この行を追加
          >
            <motion.div
              animate={{
                y: animationRange.y,
                x: animationRange.x,
                rotate: animationRange.rotate,
                scale: animationRange.scale,
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'easeInOut',
                times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
              }}
            >
              <Box
                position="relative"
                background="transparent"
                onClick={handleClick}
                // 以下の2行を追加
                width={`${size}px`}
                height={`${size}px`}
                // borderRadius="full"を"50%"に変更
                borderRadius="full"
                // 以下の行を追加
              >
                <AnimatePresence>
                  {isClicked && (
                    <motion.div
                      initial={{ scale: 1, opacity: 0.5 }}
                      animate={{ scale: 2, opacity: 0 }}
                      exit={{ scale: 2, opacity: 0 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.3)',
                        filter: 'blur(10px)',
                      }}
                    />
                  )}
                </AnimatePresence>

                <motion.div
                  animate={isClicked ? { scale: 0.9 } : { scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Box
                    fontSize="xl"
                    overflow="hidden"
                    fontWeight="bold"
                    bg="transparent"
                    borderRadius="full"
                    width={`${size}px`}
                    height={`${size}px`}
                    boxShadow="0 0 15px rgba(255, 255, 255, 0.5), inset 0 0 15px rgba(255, 255, 255, 0.5)"
                    _before={{
                      content: '""',
                      position: 'absolute',
                      top: '-50%',
                      left: '-50%',
                      width: '200%',
                      height: '200%',

                      // background:
                      //   'radial-gradient(circle at 70% 70%, rgba(255, 165, 0, 0.4), rgba(255, 255, 255, 0) 70%)',

                      background: `radial-gradient(circle at 70% 70%, ${color3}, rgba(255, 255, 255, 0) 70%)`,
                      opacity: 0.5,
                    }}
                    _after={{
                      content: '""',
                      position: 'absolute',
                      top: '-50%',
                      left: '-50%',
                      width: '200%',
                      height: '200%',
                      // background:
                      //   'radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0) 70%)',
                      background: `radial-gradient(circle at 70% 70%, ${color2}, rgba(255, 255, 255, 0) 70%)`,

                      opacity: 0.5,
                    }}
                    css={{
                      backdropFilter: 'blur(5px)',
                      // background:
                      //   'linear-gradient(135deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.1))',
                      background: `linear-gradient(135deg, ${color1}, rgba(255, 255, 255, 0.1))`,
                    }}
                    _hover={{
                      transform: 'scale(1.05)',
                      boxShadow:
                        '0 0 20px rgba(255, 255, 255, 0.7), inset 0 0 20px rgba(255, 255, 255, 0.7)',
                    }}
                    transition="all 0.3s"
                  >
                    <Text
                      position="absolute"
                      top="50%"
                      left="50%"
                      transform="translate(-50%, -50%)"
                      fontSize="2xl"
                      fontWeight="bold"
                      color="white"
                      textShadow="0 0 5px rgba(0, 0, 0, 0.5)"
                    >
                      {text}
                    </Text>
                  </Box>
                </motion.div>
              </Box>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}
