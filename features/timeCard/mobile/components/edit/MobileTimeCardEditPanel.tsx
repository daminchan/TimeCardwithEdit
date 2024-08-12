'use client';

import { Box, Heading, Spinner, Button, Flex, Text } from '@chakra-ui/react';
import Select from 'react-select';

import { CustomCard } from '@/components/ui/CustomCard';
import TimeCardEditTable from '@/features/timeCard/components/edit/TimeCardEditTable';
import { useTimeCardEdit } from '@/features/timeCard/hooks/useTimeCardEdit';

import { TimeCardEditPanelProps } from '../../types';

export default function MobileTimeCardEditPanel({
  users,
}: TimeCardEditPanelProps) {
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

  const customStyles = {
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isFocused
        ? 'rgba(255, 255, 255, 0.2)' // フォーカス時に白っぽく
        : 'transparent',
      color: 'white',
    }),
    control: (provided: any) => ({
      ...provided,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderColor: 'rgba(255, 255, 255, 0.3)',
      boxShadow: 'none',
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: 'white',
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: 'white',
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: 'rgba(128, 128, 255, 0.9)', // 背景色に近い半透明の色
    }),
    input: (provided: any) => ({
      ...provided,
      color: 'white',
    }),
  };

  const userOptions = users.map((user) => ({
    value: user.id,
    label: user.name,
  }));
  const yearOptions = years.map((year) => ({
    value: year,
    label: `${year}年`,
  }));
  const monthOptions = months.map((month) => ({
    value: month,
    label: `${month}月`,
  }));

  return (
    <CustomCard p={4}>
      <Flex direction="column" gap={4}>
        <Heading as="h2" size="lg">
          タイムカード編集
        </Heading>
        <Select
          options={userOptions}
          onChange={(option) =>
            handleUserChange({ target: { value: option?.value } } as any)
          }
          placeholder="ユーザーを選択"
          styles={customStyles}
        />
        <Select
          options={yearOptions}
          value={yearOptions.find((option) => option.value === selectedYear)}
          onChange={(option) =>
            handleYearChange({ target: { value: option?.value } } as any)
          }
          styles={customStyles}
        />
        <Select
          options={monthOptions}
          value={monthOptions.find((option) => option.value === selectedMonth)}
          onChange={(option) =>
            handleMonthChange({ target: { value: option?.value } } as any)
          }
          styles={customStyles}
        />

        {isLoading && <Spinner />}
        {!isLoading && selectedUserId && (
          <Button
            colorScheme="red"
            onClick={handleDeleteAllForMonth}
            width="100%"
          >
            この月のデータをすべて削除
          </Button>
        )}
        {!isLoading && selectedUserId && workDays.length > 0 && (
          <Box overflowX="auto">
            <TimeCardEditTable
              user={users.find((u) => u.id === selectedUserId)!}
              workDays={workDays}
              onDelete={handleEntryDelete}
            />
          </Box>
        )}
        {!isLoading && selectedUserId && workDays.length === 0 && (
          <Box>選択された月のデータはありません。</Box>
        )}
      </Flex>
    </CustomCard>
  );
}
