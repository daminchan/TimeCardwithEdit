'use client';

import { Box, Text, Flex } from '@chakra-ui/react';
import { WorkEntry } from '@prisma/client';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

import MobileStatusIndicator from './MobileStatusIndicator';

type MobileTimeCardDisplayProps = {
  entry: WorkEntry | null;
};

const formatDate = (date: Date | null) => {
  if (!date) return '未記録';
  return format(date, 'yyyy/MM/dd HH:mm:ss', { locale: ja });
};

export default function MobileTimeCardDisplay({
  entry,
}: MobileTimeCardDisplayProps) {
  const isWorking = entry?.startTime && !entry?.endTime;

  return (
    <Flex direction="column" w="100%" gap={4}>
      <MobileStatusIndicator
        isActive={isWorking}
        activeText="出勤中"
        inactiveText="オフライン"
      />
      <Box width="100%" bg="blue.50" p={3} borderRadius="md">
        <Text fontSize="md" fontWeight="bold" color="blue.700" mb={1}>
          出勤時間
        </Text>
        <Text fontSize="sm" color="blue.900">
          {formatDate(entry?.startTime ?? null)}
        </Text>
      </Box>
      <Box width="100%" bg="red.50" p={3} borderRadius="md">
        <Text fontSize="md" fontWeight="bold" color="red.700" mb={1}>
          退勤時間
        </Text>
        <Text fontSize="sm" color="red.900">
          {formatDate(entry?.endTime ?? null)}
        </Text>
      </Box>
    </Flex>
  );
}
