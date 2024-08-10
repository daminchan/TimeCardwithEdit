'use client';

import React from 'react';

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Button,
  Flex,
} from '@chakra-ui/react';

import { useTimeCardEditTable } from '../../hooks/useTimeCardEditTable';
import { TimeCardEditTableProps } from '../../types';

export default function TimeCardEditTable({
  workDays,
  onDelete,
}: TimeCardEditTableProps) {
  const { entries, handleInputChange, handleSave, handleDelete } =
    useTimeCardEditTable(workDays, onDelete);

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>日付</Th>
          <Th>開始時間</Th>
          <Th>終了時間</Th>
          <Th>休憩時間（分）</Th>
          <Th>アクション</Th>
        </Tr>
      </Thead>
      <Tbody>
        {entries.map((entry) => (
          <Tr key={entry.id}>
            <Td>{entry.date}</Td>
            <Td>
              <Input
                type="time"
                value={entry.startTime}
                onChange={(e) =>
                  handleInputChange(entry.id, 'startTime', e.target.value)
                }
              />
            </Td>
            <Td>
              <Input
                type="time"
                value={entry.endTime || ''}
                onChange={(e) =>
                  handleInputChange(entry.id, 'endTime', e.target.value || null)
                }
              />
            </Td>
            <Td>
              <Input
                type="number"
                value={entry.breakDuration || ''}
                onChange={(e) =>
                  handleInputChange(
                    entry.id,
                    'breakDuration',
                    e.target.value ? parseInt(e.target.value) : null
                  )
                }
              />
            </Td>
            <Td>
              <Flex gap={2}>
                <Button onClick={() => handleSave(entry)}>保存</Button>
                <Button
                  colorScheme="red"
                  onClick={() => handleDelete(entry.id)}
                >
                  削除
                </Button>
              </Flex>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
// "use client";

// import { useState } from "react";

// import {
//   Table,
//   Thead,
//   Tbody,
//   Tr,
//   Th,
//   Td,
//   Input,
//   Button,
//   useToast,
//   Flex,
// } from "@chakra-ui/react";
// import { format, parse } from "date-fns";
// import { FormattedWorkEntry, TimeCardEditTableProps } from "../../types";
// import {
//   deleteWorkEntry,
//   updateWorkEntry,
// } from "../../actions/timeCardActions";

// export default function TimeCardEditTable({
//   workDays,
//   onDelete,
// }: TimeCardEditTableProps) {
//   const [entries, setEntries] = useState<FormattedWorkEntry[]>(
//     workDays.flatMap((workDay) =>
//       workDay.entries.map((entry) => ({
//         id: entry.id,
//         date: format(new Date(entry.startTime), "MM/dd"),
//         startTime: format(new Date(entry.startTime), "HH:mm"),
//         endTime: entry.endTime
//           ? format(new Date(entry.endTime), "HH:mm")
//           : null,
//         breakDuration: entry.breakDuration,
//       }))
//     )
//   );

//   const toast = useToast();

//   const handleInputChange = (
//     entryId: string,
//     field: keyof FormattedWorkEntry,
//     value: string | number | null
//   ) => {
//     setEntries((prevEntries) =>
//       prevEntries.map((entry) =>
//         entry.id === entryId ? { ...entry, [field]: value } : entry
//       )
//     );
//   };
//   const handleSave = async (entry: FormattedWorkEntry) => {
//     try {
//       const currentYear = new Date().getFullYear();
//       const startDateTime = parse(
//         `${currentYear}-${entry.date} ${entry.startTime}`,
//         "yyyy-MM/dd HH:mm",
//         new Date()
//       );
//       let endDateTime = null;
//       if (entry.endTime) {
//         endDateTime = parse(
//           `${currentYear}-${entry.date} ${entry.endTime}`,
//           "yyyy-MM/dd HH:mm",
//           new Date()
//         );
//         if (endDateTime < startDateTime) {
//           endDateTime.setDate(endDateTime.getDate() + 1);
//         }
//       }

//       const updatedEntry = await updateWorkEntry(entry.id, {
//         startTime: startDateTime,
//         endTime: endDateTime,
//         breakDuration: entry.breakDuration,
//       });
//       toast({
//         title: "エントリーを更新しました",
//         status: "success",
//         duration: 3000,
//         isClosable: true,
//       });

//       // ローカルの状態を更新
//       setEntries((prevEntries) =>
//         prevEntries.map((e) =>
//           e.id === entry.id
//             ? {
//                 ...e,
//                 startTime: format(new Date(updatedEntry.startTime), "HH:mm"),
//                 endTime: updatedEntry.endTime
//                   ? format(new Date(updatedEntry.endTime), "HH:mm")
//                   : null,
//                 breakDuration: updatedEntry.breakDuration,
//               }
//             : e
//         )
//       );
//     } catch (error) {
//       console.error("Failed to update entry:", error);
//       toast({
//         title: "エントリーの更新に失敗しました",
//         status: "error",
//         duration: 3000,
//         isClosable: true,
//       });
//     }
//   };

//   const handleDelete = async (entryId: string) => {
//     try {
//       await deleteWorkEntry(entryId);
//       setEntries(entries.filter((entry) => entry.id !== entryId));
//       toast({
//         title: "エントリーを削除しました",
//         status: "success",
//         duration: 3000,
//         isClosable: true,
//       });
//       onDelete(); // 親コンポーネントに削除を通知
//     } catch (error) {
//       console.error("Failed to delete entry:", error);
//       toast({
//         title: "エントリーの削除に失敗しました",
//         status: "error",
//         duration: 3000,
//         isClosable: true,
//       });
//     }
//   };

//   return (
//     <Table variant="simple">
//       <Thead>
//         <Tr>
//           <Th>日付</Th>
//           <Th>開始時間</Th>
//           <Th>終了時間</Th>
//           <Th>休憩時間（分）</Th>
//           <Th>アクション</Th>
//         </Tr>
//       </Thead>
//       <Tbody>
//         {entries.map((entry) => (
//           <Tr key={entry.id}>
//             <Td>{entry.date}</Td>
//             <Td>
//               <Input
//                 type="time"
//                 value={entry.startTime}
//                 onChange={(e) =>
//                   handleInputChange(entry.id, "startTime", e.target.value)
//                 }
//               />
//             </Td>
//             <Td>
//               <Input
//                 type="time"
//                 value={entry.endTime || ""}
//                 onChange={(e) =>
//                   handleInputChange(entry.id, "endTime", e.target.value || null)
//                 }
//               />
//             </Td>
//             <Td>
//               <Input
//                 type="number"
//                 value={entry.breakDuration || ""}
//                 onChange={(e) =>
//                   handleInputChange(
//                     entry.id,
//                     "breakDuration",
//                     e.target.value ? parseInt(e.target.value) : null
//                   )
//                 }
//               />
//             </Td>
//             <Td>
//               <Flex gap={2}>
//                 <Button onClick={() => handleSave(entry)}>保存</Button>
//                 <Button
//                   colorScheme="red"
//                   onClick={() => handleDelete(entry.id)}
//                 >
//                   削除
//                 </Button>
//               </Flex>
//             </Td>
//           </Tr>
//         ))}
//       </Tbody>
//     </Table>
//   );
// }
