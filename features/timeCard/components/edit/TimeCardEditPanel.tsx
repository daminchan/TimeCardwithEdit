'use client';

import { Box, Select, Heading, Spinner, Flex, Button } from '@chakra-ui/react';

import { CustomCard } from '@/components/ui/CustomCard';

import TimeCardEditTable from './TimeCardEditTable';
import { useTimeCardEdit } from '../../hooks/useTimeCardEdit';
import { TimeCardEditPanelProps } from '../../types';

export default function TimeCardEditPanel({ users }: TimeCardEditPanelProps) {
  const {
    selectedUserId,
    selectedYear,
    selectedMonth,
    workDays,
    isLoading,
    handleUserChange,
    handleYearChange,
    handleMonthChange,
    handleDeleteAllForMonth,
    handleEntryDelete,
  } = useTimeCardEdit();

  const years = Array.from(
    { length: 5 },
    (_, i) => new Date().getFullYear() - i
  );
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <CustomCard p={4}>
      <Flex direction="column" gap={4}>
        <Heading as="h2" size="lg">
          タイムカード編集
        </Heading>
        <Flex gap={4}>
          <Select placeholder="ユーザーを選択" onChange={handleUserChange}>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </Select>
          <Select value={selectedYear} onChange={handleYearChange}>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}年
              </option>
            ))}
          </Select>
          <Select value={selectedMonth} onChange={handleMonthChange}>
            {months.map((month) => (
              <option key={month} value={month}>
                {month}月
              </option>
            ))}
          </Select>
        </Flex>

        {isLoading && <Spinner />}
        {!isLoading && selectedUserId && (
          <Button
            colorScheme="red"
            onClick={handleDeleteAllForMonth}
            alignSelf="flex-start"
          >
            この月のデータをすべて削除
          </Button>
        )}
        {!isLoading && selectedUserId && workDays.length > 0 && (
          <TimeCardEditTable
            user={users.find((u) => u.id === selectedUserId)!}
            workDays={workDays}
            onDelete={handleEntryDelete}
          />
        )}
        {!isLoading && selectedUserId && workDays.length === 0 && (
          <Box>選択された月のデータはありません。</Box>
        )}
      </Flex>
    </CustomCard>
  );
}
// "use client";

// import { useState, useEffect } from "react";

// import {
//   Box,
//   Select,
//   Heading,
//   Spinner,
//   Flex,
//   useToast,
//   Button,
// } from "@chakra-ui/react";
// import { TimeCardEditPanelProps } from "../../types";
// import {
//   deleteAllWorkEntriesForMonth,
//   getUserWorkDaysForMonth,
// } from "../../actions/timeCardActions";
// import TimeCardEditTable from "./TimeCardEditTable";

// import { WorkDay, WorkEntry } from "@prisma/client";
// import { CustomCard } from "@/components/ui/CustomCard";

// export default function TimeCardEditPanel({ users }: TimeCardEditPanelProps) {
//   const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
//   const [selectedYear, setSelectedYear] = useState<number>(
//     new Date().getFullYear()
//   );
//   const [selectedMonth, setSelectedMonth] = useState<number>(
//     new Date().getMonth() + 1
//   );
//   const [workDays, setWorkDays] = useState<
//     (WorkDay & { entries: WorkEntry[] })[]
//   >([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const toast = useToast();

//   useEffect(() => {
//     if (selectedUserId) {
//       setIsLoading(true);
//       setWorkDays([]);
//       getUserWorkDaysForMonth(selectedUserId, selectedYear, selectedMonth)
//         .then(setWorkDays)
//         .finally(() => setIsLoading(false));
//     }
//   }, [selectedUserId, selectedYear, selectedMonth]);

//   const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedUserId(event.target.value);
//   };

//   const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedYear(Number(event.target.value));
//   };

//   const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedMonth(Number(event.target.value));
//   };

//   const handleDeleteAllForMonth = async () => {
//     if (!selectedUserId) return;

//     if (
//       window.confirm(
//         `${selectedYear}年${selectedMonth}月のすべての勤退記録を削除しますか？`
//       )
//     ) {
//       setIsLoading(true);
//       try {
//         await deleteAllWorkEntriesForMonth(
//           selectedUserId,
//           selectedYear,
//           selectedMonth
//         );
//         setWorkDays([]);
//         toast({
//           title: "すべての勤退記録を削除しました",
//           status: "success",
//           duration: 3000,
//           isClosable: true,
//         });
//       } catch (error) {
//         console.error("Failed to delete all entries:", error);
//         toast({
//           title: "勤退記録の削除に失敗しました",
//           status: "error",
//           duration: 3000,
//           isClosable: true,
//         });
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   const handleEntryDelete = () => {
//     // 単一のエントリが削除された後、データを再取得
//     if (selectedUserId) {
//       setIsLoading(true);
//       getUserWorkDaysForMonth(selectedUserId, selectedYear, selectedMonth)
//         .then(setWorkDays)
//         .finally(() => setIsLoading(false));
//     }
//   };

//   const years = Array.from(
//     { length: 5 },
//     (_, i) => new Date().getFullYear() - i
//   );
//   const months = Array.from({ length: 12 }, (_, i) => i + 1);

//   return (
//     <CustomCard>
//       <Box >
//         <Heading as="h2" size="lg">
//           タイムカード編集
//         </Heading>
//         <Flex gap={4}>
//           <Select placeholder="ユーザーを選択" onChange={handleUserChange}>
//             {users.map((user) => (
//               <option key={user.id} value={user.id}>
//                 {user.name}
//               </option>
//             ))}
//           </Select>
//           <Select value={selectedYear} onChange={handleYearChange}>
//             {years.map((year) => (
//               <option key={year} value={year}>
//                 {year}年
//               </option>
//             ))}
//           </Select>
//           <Select value={selectedMonth} onChange={handleMonthChange}>
//             {months.map((month) => (
//               <option key={month} value={month}>
//                 {month}月
//               </option>
//             ))}
//           </Select>
//         </Flex>

//         {isLoading && <Spinner />}
//         {!isLoading && selectedUserId && (
//           <Button colorScheme="red" onClick={handleDeleteAllForMonth} mb={4}>
//             この月のデータをすべて削除
//           </Button>
//         )}
//         {!isLoading && selectedUserId && workDays.length > 0 && (
//           <TimeCardEditTable
//             user={users.find((u) => u.id === selectedUserId)!}
//             workDays={workDays}
//             onDelete={handleEntryDelete}
//           />
//         )}
//         {!isLoading && selectedUserId && workDays.length === 0 && (
//           <Box>選択された月のデータはありません。</Box>
//         )}
//       </Box>
//     </CustomCard>
//   );
// }
