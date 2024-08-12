import { Heading, Text } from '@chakra-ui/react';
import { Shift } from '@prisma/client';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

import FlexCol from '@/components/ui/FlexCol';

type MobileShiftUpcomingListProps = {
  shifts: Shift[];
};

export default function MobileShiftUpcomingList({
  shifts,
}: MobileShiftUpcomingListProps) {
  if (shifts.length === 0) return null;
  return (
    <FlexCol gap={2}>
      <Heading as="h3" size="lg" fontWeight="bold" color="gray.200">
        今後のシフト
      </Heading>
      {shifts.map((shift, index) => (
        <Text key={index} fontSize="md" fontWeight="bold" color="gray.200">
          {format(new Date(shift.startTime), 'M月d日(E) HH:mm', { locale: ja })}{' '}
          -{format(new Date(shift.endTime), 'HH:mm', { locale: ja })}
        </Text>
      ))}
    </FlexCol>
  );
}
