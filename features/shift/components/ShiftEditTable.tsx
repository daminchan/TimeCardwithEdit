'use client';

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Box,
  Flex,
} from '@chakra-ui/react';
import { format, setDate } from 'date-fns';
import { ja } from 'date-fns/locale';

import { ShiftModal } from './ShiftModal';
import { useShiftManagement } from '../hooks/useShiftManagement';
import { ShiftTableProps } from '../types';

export default function ShiftEditTable({
  users,
  year,
  month,
}: ShiftTableProps) {
  const {
    selectedShift,
    editedShift,
    setEditedShift,
    handleDelete,
    handleUpdate,
    handleAddShift,
    openAddModal,
    openEditModal,
    isOpen,
    onClose,
  } = useShiftManagement();

  const daysInMonth = new Date(year, month, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  function formatTime(date: Date | string) {
    const dateObject = typeof date === 'string' ? new Date(date) : date;
    return format(dateObject, 'HH:mm', { locale: ja });
  }

  return (
    <Box overflowX="auto">
      <Table>
        <Thead>
          <Tr>
            <Th color={'gray.200'}>日付</Th>
            {users.map((user) => (
              <Th key={user.id}>
                <Button onClick={() => openAddModal(user.id)}>
                  {user.name}
                </Button>
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {days.map((day) => (
            <Tr key={day}>
              <Td>
                {format(setDate(new Date(year, month - 1), day), 'M/d(E)', {
                  locale: ja,
                })}
              </Td>
              {users.map((user) => {
                const shift = user.shifts.find((s) => {
                  const shiftDate = new Date(s.startTime);
                  const currentDate = new Date(year, month - 1, day);
                  return (
                    shiftDate.getDate() === currentDate.getDate() &&
                    shiftDate.getMonth() === currentDate.getMonth() &&
                    shiftDate.getFullYear() === currentDate.getFullYear()
                  );
                });
                return (
                  <Td key={user.id}>
                    {shift ? (
                      <Flex direction="column" align="start">
                        <Box>
                          {formatTime(shift.startTime)} -{' '}
                          {formatTime(shift.endTime)}
                        </Box>
                        <Flex mt={2}>
                          <Button
                            size="sm"
                            onClick={() => handleDelete(shift.id)}
                          >
                            削除
                          </Button>
                          <Button
                            size="sm"
                            ml={2}
                            onClick={() => openEditModal(shift)}
                          >
                            編集
                          </Button>
                        </Flex>
                      </Flex>
                    ) : (
                      '-'
                    )}
                  </Td>
                );
              })}
            </Tr>
          ))}
        </Tbody>
      </Table>
      <ShiftModal
        isOpen={isOpen}
        onClose={onClose}
        editedShift={editedShift}
        setEditedShift={setEditedShift}
        onSubmit={selectedShift?.id ? handleUpdate : handleAddShift}
        headerText={selectedShift?.id ? 'シフト編集' : 'シフト追加'}
        submitButtonText={selectedShift?.id ? '更新' : '追加'}
      />
    </Box>
  );
}
// "use client";

// import { useState } from "react";
// import { ShiftTableProps } from "../types";
// import Link from "next/link";
// import { format, setDate, setMonth, setYear } from "date-fns";
// import { ja } from "date-fns/locale";
// import {
//   Table,
//   Thead,
//   Tbody,
//   Tr,
//   Th,
//   Td,
//   Button,
//   Flex,
//   Heading,
//   Box,
// } from "@chakra-ui/react";

// export default function ShiftTable({
//   users,
//   year: initialYear,
//   month: initialMonth,
// }: ShiftTableProps) {
//   const [currentDate, setCurrentDate] = useState(
//     new Date(initialYear, initialMonth - 1, 1)
//   );

//   const daysInMonth = new Date(
//     currentDate.getFullYear(),
//     currentDate.getMonth() + 1,
//     0
//   ).getDate();
//   const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

//   function formatTime(date: Date | string) {
//     if (typeof date === "string") {
//       date = new Date(date);
//     }
//     return format(date, "HH:mm", { locale: ja });
//   }

//   const handlePreviousMonth = () => {
//     setCurrentDate((prevDate) => setMonth(prevDate, prevDate.getMonth() - 1));
//   };

//   const handleNextMonth = () => {
//     setCurrentDate((prevDate) => setMonth(prevDate, prevDate.getMonth() + 1));
//   };

//   return (
//     <Box>
//       <Flex justify="space-between" align="center" mb={4}>
//         <Button onClick={handlePreviousMonth}>前月</Button>
//         <Heading size="md">
//           {format(currentDate, "yyyy年M月", { locale: ja })}
//         </Heading>
//         <Button onClick={handleNextMonth}>翌月</Button>
//       </Flex>
//       <Box overflowX="auto">
//         <Table variant="simple">
//           <Thead>
//             <Tr>
//               <Th>日付</Th>
//               {users.map((user) => (
//                 <Th key={user.id}>
//                   <Link
//                     href={`/my-page/shift-edit/${
//                       user.id
//                     }?year=${currentDate.getFullYear()}&month=${
//                       currentDate.getMonth() + 1
//                     }`}
//                   >
//                     {user.name}
//                   </Link>
//                 </Th>
//               ))}
//             </Tr>
//           </Thead>
//           <Tbody>
//             {days.map((day) => (
//               <Tr key={day}>
//                 <Td>
//                   {format(setDate(currentDate, day), "M/d", { locale: ja })}
//                 </Td>
//                 {users.map((user) => {
//                   const shift = user.shifts.find(
//                     (s) =>
//                       new Date(s.date).getDate() === day &&
//                       new Date(s.date).getMonth() === currentDate.getMonth() &&
//                       new Date(s.date).getFullYear() ===
//                         currentDate.getFullYear()
//                   );
//                   return (
//                     <Td key={user.id}>
//                       {shift
//                         ? `${formatTime(shift.startTime)} - ${formatTime(
//                             shift.endTime
//                           )}`
//                         : "-"}
//                     </Td>
//                   );
//                 })}
//               </Tr>
//             ))}
//           </Tbody>
//         </Table>
//       </Box>
//     </Box>
//   );
// }
