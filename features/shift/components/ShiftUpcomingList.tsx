import { Heading, Text } from '@chakra-ui/react';
import { Shift } from '@prisma/client';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

import FlexCol from '@/components/ui/FlexCol';

type ShiftUpcomingListProps = {
  shifts: Shift[];
};

export default function ShiftUpcomingList({ shifts }: ShiftUpcomingListProps) {
  if (shifts.length === 0) return null;
  return (
    <FlexCol gap={2}>
      <Heading as="h3" size="md">
        今後のシフト
      </Heading>
      {shifts.map((shift, index) => (
        <Text key={index}>
          {format(new Date(shift.startTime), 'M月d日(E) HH:mm', { locale: ja })}{' '}
          -{format(new Date(shift.endTime), 'HH:mm', { locale: ja })}
        </Text>
      ))}
    </FlexCol>
  );
}
