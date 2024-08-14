'use client';
import React from 'react';
import {
  Box,
  Text,
  Flex,
  Switch,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  Accordion,
  AccordionPanel,
} from '@chakra-ui/react';
import { format, setDate, isSameDay } from 'date-fns';
import { ja } from 'date-fns/locale';

import FlexCol from '@/components/ui/FlexCol';
import { ShiftTableProps } from '../types';

export default function MobileShiftViewTable({
  users,
  year,
  month,
  currentUserId,
}: ShiftTableProps & { currentUserId?: string }) {
  const [showAllUsers, setShowAllUsers] = React.useState(false);

  const daysInMonth = new Date(year, month, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  function formatTime(date: Date | string) {
    const dateObject = typeof date === 'string' ? new Date(date) : date;
    return format(dateObject, 'HH:mm', { locale: ja });
  }

  const filteredUsers = showAllUsers
    ? users
    : users.filter((user) => user.id === currentUserId);

  return (
    <Flex direction="column" align="center" justify="center" width="100%" p={4}>
      <Flex direction="column" gap={3} align="center" justify="center">
        <Switch
          id="show-all-users"
          isChecked={showAllUsers}
          onChange={(e) => setShowAllUsers(e.target.checked)}
          size="md"
        />
        <Text fontSize="sm">全員のシフトを表示</Text>
      </Flex>

      <Flex
        direction="column"
        gap={3}
        align="center"
        justify="center"
        width="100%"
      >
        <Accordion allowMultiple width="80%">
          <Flex direction="column" gap={2}>
            {days.map((day) => {
              const currentDate = new Date(year, month - 1, day);
              const shiftsForDay = filteredUsers.flatMap((user) =>
                user.shifts
                  .filter((shift) =>
                    isSameDay(new Date(shift.startTime), currentDate)
                  )
                  .map((shift) => ({ ...shift, userName: user.name }))
              );
              const hasCurrentUserShift = shiftsForDay.some(
                (shift) => shift.userId === currentUserId
              );
              const hasOtherUserShift = shiftsForDay.some(
                (shift) => shift.userId !== currentUserId
              );

              let bgColor = 'rgba(255, 255, 255, 0.1)';
              if (hasCurrentUserShift) bgColor = 'rgba(0, 255, 0, 0.2)';
              else if (hasOtherUserShift) bgColor = 'rgba(255, 255, 0, 0.2)';

              return (
                <AccordionItem key={day} border="none">
                  <h2>
                    <AccordionButton
                      bg={bgColor}
                      borderRadius="md"
                      _hover={{ bg: 'rgba(255, 255, 255, 0.2)' }}
                    >
                      <Box flex="1" textAlign="left">
                        <Text fontWeight="bold" color="white">
                          {format(currentDate, 'M月d日(E)', { locale: ja })}
                        </Text>
                      </Box>
                      <AccordionIcon color="white" />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel
                    pb={4}
                    bg="rgba(255, 255, 255, 0.05)"
                    borderRadius="md"
                  >
                    <Flex direction="column" gap={2}>
                      {shiftsForDay.map((shift) => (
                        <Flex key={shift.id} justifyContent="space-between">
                          <Text fontSize="sm" color="white">
                            {shift.userName}
                          </Text>
                          <Text fontSize="sm" color="white">
                            {formatTime(shift.startTime)} -{' '}
                            {formatTime(shift.endTime)}
                          </Text>
                        </Flex>
                      ))}
                    </Flex>
                  </AccordionPanel>
                </AccordionItem>
              );
            })}
          </Flex>
        </Accordion>
      </Flex>
    </Flex>
  );
}
// 'use client';

// import { useState } from 'react';

// import {
//   Box,
//   Switch,
//   Flex,
//   Text,
//   Accordion,
//   AccordionItem,
//   AccordionButton,
//   AccordionPanel,
//   AccordionIcon,
//   useColorModeValue,
// } from '@chakra-ui/react';
// import { format, setDate } from 'date-fns';
// import { ja } from 'date-fns/locale';

// import FlexCol from '@/components/ui/FlexCol';

// import { ShiftTableProps, Shift } from '../types';

// export default function MobileShiftViewTable({
//   users,
//   year,
//   month,
//   currentUserId,
// }: ShiftTableProps & { currentUserId?: string }) {
//   const [showAllUsers, setShowAllUsers] = useState(false);

//   const daysInMonth = new Date(year, month, 0).getDate();
//   const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

//   function formatTime(date: Date | string) {
//     const dateObject = typeof date === 'string' ? new Date(date) : date;
//     return format(dateObject, 'HH:mm', { locale: ja });
//   }
//   const filteredUsers = showAllUsers
//     ? users.filter((user) =>
//         user.shifts.some((shift) => {
//           const shiftDate = new Date(shift.startTime);
//           return (
//             shiftDate.getMonth() === month - 1 &&
//             shiftDate.getFullYear() === year
//           );
//         })
//       )
//     : users.filter((user) => user.id === currentUserId);

//   // const filteredUsers = showAllUsers
//   //   ? users
//   //   : users.filter((user) => user.id === currentUserId);

//   const highlightColor = useColorModeValue('blue.50', 'blue.900');
//   const normalColor = useColorModeValue('white', 'gray.800');

//   return (
//     <FlexCol gap={4} width="100%" height="100%">
//       {' '}
//       {/* maxWidth="100%" overflow="hidden" を削除し、width="100%" height="100%" を追加 */}
//       <Flex
//         justifyContent="flex-end"
//         alignItems="center"
//         as="label"
//         htmlFor="show-all-users"
//         py={2}
//         px={3}
//         borderRadius="md"
//         cursor="pointer"
//         // bg={useColorModeValue('gray.500', 'gray.700')}
//         gap={2}
//       >
//         <Switch
//           id="show-all-users"
//           isChecked={showAllUsers}
//           onChange={(e) => setShowAllUsers(e.target.checked)}
//           size="lg"
//         />
//         <Text fontSize="sm">全員のシフトを表示</Text>
//       </Flex>
//       <Box width="100%" height="calc(100% - 40px)" overflowY="auto">
//         {' '}
//         {/* 高さを調整し、縦スクロールを追加 */}
//         <Accordion allowMultiple width="100%">
//           {/* bg="gray.900" を削除し、width="100%" を追加 */}
//           {days.map((day) => {
//             const shiftsForDay = filteredUsers.filter((user) =>
//               user.shifts.some((s) => {
//                 const shiftDate = new Date(s.startTime);
//                 const currentDate = new Date(year, month - 1, day);
//                 return (
//                   shiftDate.getDate() === currentDate.getDate() &&
//                   shiftDate.getMonth() === currentDate.getMonth() &&
//                   shiftDate.getFullYear() === currentDate.getFullYear()
//                 );
//               })
//             );
//             const hasShifts = shiftsForDay.length > 0;

//             return (
//               <AccordionItem
//                 key={day}
//                 bg={hasShifts ? highlightColor : normalColor}
//               >
//                 <h2>
//                   <AccordionButton>
//                     <Box flex="1" textAlign="left">
//                       <Text
//                         fontWeight={hasShifts ? 'bold' : 'normal'}
//                         color="gray.500"
//                       >
//                         {format(
//                           setDate(new Date(year, month - 1), day),
//                           'M/d(E)',
//                           {
//                             locale: ja,
//                           }
//                         )}
//                       </Text>
//                     </Box>
//                     <Text
//                       fontSize="sm"
//                       color={hasShifts ? 'blue.500' : 'gray.500'}
//                       mr={2}
//                     >
//                       {shiftsForDay.length}人のシフト
//                     </Text>
//                     <AccordionIcon />
//                   </AccordionButton>
//                 </h2>
//                 <AccordionPanel pb={2}>
//                   <FlexCol gap={1}>
//                     {shiftsForDay.map((user) => {
//                       const shift = user.shifts.find((s) => {
//                         const shiftDate = new Date(s.startTime);
//                         const currentDate = new Date(year, month - 1, day);
//                         return (
//                           shiftDate.getDate() === currentDate.getDate() &&
//                           shiftDate.getMonth() === currentDate.getMonth() &&
//                           shiftDate.getFullYear() === currentDate.getFullYear()
//                         );
//                       });
//                       return (
//                         <Box key={user.id}>
//                           <Text fontWeight="bold" color="gray.500">
//                             {user.name}
//                           </Text>
//                           <Text color="gray.500">
//                             {shift
//                               ? `${formatTime(shift.startTime)} - ${formatTime(
//                                   shift.endTime
//                                 )}`
//                               : '-'}
//                           </Text>
//                         </Box>
//                       );
//                     })}
//                   </FlexCol>
//                 </AccordionPanel>
//               </AccordionItem>
//             );
//           })}
//         </Accordion>
//       </Box>
//     </FlexCol>
//   );
// }
