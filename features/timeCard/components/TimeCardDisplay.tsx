import { Box, Text } from '@chakra-ui/react';
import { WorkEntry } from '@prisma/client';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

import FlexCol from '@/components/ui/FlexCol';
import StatusIndicator from '@/components/ui/StatusIndicator';

type TimeCardDisplayProps = {
  entry: WorkEntry | null;
};

const formatDate = (date: Date | null) => {
  if (!date) return '未記録';
  return format(date, 'yyyy/MM/dd HH:mm:ss', { locale: ja });
};

export default function TimeCardDisplay({ entry }: TimeCardDisplayProps) {
  const isWorking = entry?.startTime && !entry?.endTime;

  return (
    <FlexCol w="100%" gap={6}>
      <StatusIndicator
        isActive={isWorking}
        activeText="出勤中"
        inactiveText="オフライン"
      />
      <Box width="100%" bg="blue.100" p={4} borderRadius="xl" boxShadow="md">
        <Text fontSize="xl" fontWeight="bold" color="blue.700" mb={2}>
          出勤時間
        </Text>
        <Text fontSize="lg" color="blue.900">
          {formatDate(entry?.startTime ?? null)}
        </Text>
      </Box>
      <Box width="100%" bg="red.100" p={4} borderRadius="xl" boxShadow="md">
        <Text fontSize="xl" fontWeight="bold" color="red.700" mb={2}>
          退勤時間
        </Text>
        <Text fontSize="lg" color="red.900">
          {formatDate(entry?.endTime ?? null)}
        </Text>
      </Box>
    </FlexCol>
  );
}
