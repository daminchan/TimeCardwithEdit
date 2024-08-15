'use client';

import React from 'react';

import { Box, Flex, Text, Divider } from '@chakra-ui/react';
import { format, setDate } from 'date-fns';
import { ja } from 'date-fns/locale';
import dynamic from 'next/dynamic';
import Select, { Props } from 'react-select';

import CustomButton from '@/components/button/CustomButton';

import { ShiftModal } from '../components/ShiftModal';
import { useShiftManagement } from '../hooks/useShiftManagement';
import { ShiftTableProps } from '../types';

const DynamicSelect = dynamic<Props<any, false>>(() => import('react-select'), {
  ssr: false,
});

export default function MobileShiftEditTable({
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

  const [selectedDay, setSelectedDay] = React.useState(days[0]);
  const [selectedUser, setSelectedUser] = React.useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = React.useState(month);
  function formatTime(date: Date | string) {
    const dateObject = typeof date === 'string' ? new Date(date) : date;
    return format(dateObject, 'HH:mm', { locale: ja });
  }

  const dayOptions = days.map((day) => ({
    value: day,
    label: day.toString(), // 日付のみを表示
  }));
  // const dayOptions = days.map((day) => ({
  //   value: day,
  //   label: format(setDate(new Date(year, month - 1), day), 'M/d(E)', {
  //     locale: ja,
  //   }),
  // }));

  const userOptions = users.map((user) => ({
    value: user.id,
    label: user.name,
  }));

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderColor: 'rgba(255, 255, 255, 0.3)',
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: 'white',
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isFocused
        ? 'rgba(255, 255, 255, 0.2)'
        : 'transparent',
      color: 'white',
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: 'rgba(45, 55, 72, 0.9)',
    }),
  };

  const monthOptions = [
    { value: month, label: `${month}月` },
    { value: month + 1, label: `${month + 1}月` },
  ];

  const shiftsForSelectedDay = React.useMemo(() => {
    return users
      .flatMap((user) =>
        user.shifts
          .filter((shift) => {
            const shiftDate = new Date(shift.startTime);
            return (
              shiftDate.getDate() === selectedDay &&
              shiftDate.getMonth() === selectedMonth - 1 &&
              shiftDate.getFullYear() === year
            );
          })
          .map((shift) => ({ ...shift, userName: user.name, userId: user.id }))
      )
      .sort(
        (a, b) =>
          new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
      );
  }, [users, selectedDay, selectedMonth, year]);

  const selectedUserShifts = React.useMemo(() => {
    if (!selectedUser) return [];
    return (
      users
        .find((user) => user.id === selectedUser)
        ?.shifts.filter((shift) => {
          const shiftDate = new Date(shift.startTime);
          return (
            shiftDate.getMonth() === selectedMonth - 1 &&
            shiftDate.getFullYear() === year
          );
        })
        .sort(
          (a, b) =>
            new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
        ) || []
    );
  }, [users, selectedUser, selectedMonth, year]);

  return (
    <Flex direction="column" gap={4}>
      <Flex gap={2}>
        <DynamicSelect
          options={monthOptions}
          value={monthOptions.find((option) => option.value === selectedMonth)}
          onChange={(option) => setSelectedMonth(option?.value || month)}
          styles={customStyles}
        />
        <DynamicSelect
          options={dayOptions}
          value={dayOptions.find((option) => option.value === selectedDay)}
          onChange={(option) => setSelectedDay(option?.value || days[0])}
          styles={customStyles}
        />
        <DynamicSelect
          options={userOptions}
          value={userOptions.find((option) => option.value === selectedUser)}
          onChange={(option) => setSelectedUser(option?.value || null)}
          styles={customStyles}
          isClearable
          placeholder="ユーザーを選択"
        />
      </Flex>
      {selectedUser && (
        <CustomButton onClick={() => openAddModal(selectedUser)}>
          シフト追加
        </CustomButton>
      )}
      <Divider />
      <Box>
        <Text fontWeight="bold" mb={2}>
          {format(
            new Date(year, selectedMonth - 1, selectedDay),
            'yyyy年M月d日(E)',
            {
              locale: ja,
            }
          )}
          のシフト
        </Text>
        {shiftsForSelectedDay.length > 0 ? (
          shiftsForSelectedDay.map((shift) => (
            <Flex
              key={shift.id}
              direction="column"
              gap={2}
              mb={4}
              p={2}
              borderWidth={1}
              borderRadius="md"
            >
              <Text>
                {shift.userName}: {formatTime(shift.startTime)} -{' '}
                {formatTime(shift.endTime)}
              </Text>
              <Flex gap={2}>
                <CustomButton
                  backgroundColor="#8b4513"
                  hoverBackgroundColor="#733a0f"
                  activeBackgroundColor="#a0522d"
                  size="sm"
                  onClick={() => handleDelete(shift.id)}
                >
                  削除
                </CustomButton>
                <CustomButton size="sm" onClick={() => openEditModal(shift)}>
                  編集
                </CustomButton>
              </Flex>
            </Flex>
          ))
        ) : (
          <Text>この日には現在勤務予定のメンバーはいません。</Text>
        )}
      </Box>
      {selectedUser && (
        <Box mt={4}>
          <Text fontWeight="bold" mb={2}>
            選択されたユーザーのシフト情報
          </Text>
          {selectedUserShifts.length > 0 ? (
            selectedUserShifts.map((shift) => (
              <Flex
                key={shift.id}
                direction="column"
                gap={2}
                mb={4}
                p={2}
                borderWidth={1}
                borderRadius="md"
              >
                <Text>
                  {format(new Date(shift.startTime), 'M月d日(E)', {
                    locale: ja,
                  })}
                  : {formatTime(shift.startTime)} - {formatTime(shift.endTime)}
                </Text>
              </Flex>
            ))
          ) : (
            <Text>このユーザーには現在登録されているシフトがありません。</Text>
          )}
        </Box>
      )}
      <ShiftModal
        isOpen={isOpen}
        onClose={onClose}
        editedShift={editedShift}
        setEditedShift={setEditedShift}
        onSubmit={selectedShift?.id ? handleUpdate : handleAddShift}
        headerText={selectedShift?.id ? 'シフト編集' : 'シフト追加'}
        submitButtonText={selectedShift?.id ? '更新' : '追加'}
      />
    </Flex>
  );
}
// 'use client';

// import React from 'react';

// import { Box, Flex, Text, Button, Divider } from '@chakra-ui/react';
// import { format, setDate } from 'date-fns';
// import { ja } from 'date-fns/locale';
// import dynamic from 'next/dynamic';
// import Select, { Props } from 'react-select';

// import CustomButton from '@/components/button/CustomButton';

// import { ShiftModal } from '../components/ShiftModal';
// import { useShiftManagement } from '../hooks/useShiftManagement';
// import { ShiftTableProps } from '../types';

// const DynamicSelect = dynamic<Props<any, false>>(() => import('react-select'), {
//   ssr: false,
// });

// export default function MobileShiftEditTable({
//   users,
//   year,
//   month,
// }: ShiftTableProps) {
//   const {
//     selectedShift,
//     editedShift,
//     setEditedShift,
//     handleDelete,
//     handleUpdate,
//     handleAddShift,
//     openAddModal,
//     openEditModal,
//     isOpen,
//     onClose,
//   } = useShiftManagement();

//   const daysInMonth = new Date(year, month, 0).getDate();
//   const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

//   const [selectedDay, setSelectedDay] = React.useState(days[0]);
//   const [selectedUser, setSelectedUser] = React.useState(users[0]?.id);

//   function formatTime(date: Date | string) {
//     const dateObject = typeof date === 'string' ? new Date(date) : date;
//     return format(dateObject, 'HH:mm', { locale: ja });
//   }

//   const dayOptions = days.map((day) => ({
//     value: day,
//     label: format(setDate(new Date(year, month - 1), day), 'M/d(E)', {
//       locale: ja,
//     }),
//   }));

//   const userOptions = users.map((user) => ({
//     value: user.id,
//     label: user.name,
//   }));

//   const customStyles = {
//     control: (provided: any) => ({
//       ...provided,
//       backgroundColor: 'rgba(255, 255, 255, 0.1)',
//       borderColor: 'rgba(255, 255, 255, 0.3)',
//     }),
//     singleValue: (provided: any) => ({
//       ...provided,
//       color: 'white',
//     }),
//     option: (provided: any, state: any) => ({
//       ...provided,
//       backgroundColor: state.isFocused
//         ? 'rgba(255, 255, 255, 0.2)'
//         : 'transparent',
//       color: 'white',
//     }),
//     menu: (provided: any) => ({
//       ...provided,
//       backgroundColor: 'rgba(45, 55, 72, 0.9)',
//     }),
//   };

//   return (
//     <Flex direction="column" gap={4}>
//       <Flex gap={2}>
//         {/* 日付選択が必要になった場合、以下のようにDynamicSelectを使用して実装できます
//     <DynamicSelect
//       options={dayOptions}
//       value={dayOptions.find((option) => option.value === selectedDay)}
//       onChange={(option) => setSelectedDay(option?.value || days[0])}
//       styles={customStyles}
//     />
//     */}
//         <DynamicSelect
//           options={userOptions}
//           value={userOptions.find((option) => option.value === selectedUser)}
//           onChange={(option) => setSelectedUser(option?.value || users[0]?.id)}
//           styles={customStyles}
//         />
//       </Flex>
//       <CustomButton onClick={() => openAddModal(selectedUser)}>
//         シフト追加
//       </CustomButton>
//       <Divider />
//       {/* <Flex direction="column" gap={4}>
//         {users.map((user) => {
//           const shift = user.shifts.find((s) => {
//             const shiftDate = new Date(s.startTime);
//             const currentDate = new Date(year, month - 1, selectedDay);
//             return (
//               shiftDate.getDate() === currentDate.getDate() &&
//               shiftDate.getMonth() === currentDate.getMonth() &&
//               shiftDate.getFullYear() === currentDate.getFullYear()
//             );
//           });

//           if (user.id !== selectedUser) return null;

//           return (
//             <Box key={user.id} p={2} borderWidth={1} borderRadius="md">
//               <Text fontWeight="bold">{user.name}</Text>
//               {shift ? (
//                 <Flex direction="column" gap={2} mt={2}>
//                   <Text>
//                     {formatTime(shift.startTime)} - {formatTime(shift.endTime)}
//                   </Text>
//                   <Flex gap={2}>
//                     <Button size="sm" onClick={() => handleDelete(shift.id)}>
//                       削除
//                     </Button>
//                     <Button size="sm" onClick={() => openEditModal(shift)}>
//                       編集
//                     </Button>
//                   </Flex>
//                 </Flex>
//               ) : (
//                 <Text>シフトなし</Text>
//               )}
//             </Box>
//           );
//         })}
//       </Flex> */}
//       <Flex direction="column" gap={4}>
//         {users
//           .filter((user) => user.id === selectedUser)
//           .map((user) => (
//             <Box key={user.id} p={2} borderWidth={1} borderRadius="md">
//               <Text fontWeight="bold" mb={2}>
//                 {user.name}のシフト
//               </Text>
//               {user.shifts.length > 0 ? (
//                 user.shifts
//                   .sort(
//                     (a, b) =>
//                       new Date(a.startTime).getTime() -
//                       new Date(b.startTime).getTime()
//                   )
//                   .map((shift) => (
//                     <Flex key={shift.id} direction="column" gap={2} mb={4}>
//                       <Text>
//                         {format(new Date(shift.startTime), 'M/d(E)', {
//                           locale: ja,
//                         })}{' '}
//                         {formatTime(shift.startTime)} -{' '}
//                         {formatTime(shift.endTime)}
//                       </Text>
//                       <Flex gap={2}>
//                         <CustomButton
//                           size="sm"
//                           onClick={() => handleDelete(shift.id)}
//                         >
//                           削除
//                         </CustomButton>
//                         <CustomButton
//                           size="sm"
//                           onClick={() => openEditModal(shift)}
//                         >
//                           編集
//                         </CustomButton>
//                       </Flex>
//                     </Flex>
//                   ))
//               ) : (
//                 <Text>シフトなし</Text>
//               )}
//             </Box>
//           ))}
//       </Flex>
//       <ShiftModal
//         isOpen={isOpen}
//         onClose={onClose}
//         editedShift={editedShift}
//         setEditedShift={setEditedShift}
//         onSubmit={selectedShift?.id ? handleUpdate : handleAddShift}
//         headerText={selectedShift?.id ? 'シフト編集' : 'シフト追加'}
//         submitButtonText={selectedShift?.id ? '更新' : '追加'}
//       />
//     </Flex>
//   );
// }
