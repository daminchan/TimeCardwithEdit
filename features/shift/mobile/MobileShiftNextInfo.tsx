import { Heading, Text } from '@chakra-ui/react';
import { Shift } from '@prisma/client';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

import FlexCol from '@/components/ui/FlexCol';

type MobileShiftNextInfoProps = {
  nextShift: Shift | null;
  coworkerCount: number;
};

export default function MobileShiftNextInfo({
  nextShift,
  coworkerCount,
}: MobileShiftNextInfoProps) {
  if (!nextShift) return null;
  return (
    <FlexCol gap={2}>
      <Heading as="h3" size="lg" fontWeight="bold" color="gray.200">
        次回のシフト
      </Heading>
      <Text fontSize="md" fontWeight="bold" color="gray.200">
        {format(new Date(nextShift.startTime), 'M月d日(E) HH:mm', {
          locale: ja,
        })}{' '}
        -{format(new Date(nextShift.endTime), 'HH:mm', { locale: ja })}
      </Text>
      <Text fontSize="md" fontWeight="bold" color="gray.200">
        他の対応メンバー数: {coworkerCount}人
      </Text>
    </FlexCol>
  );
}
