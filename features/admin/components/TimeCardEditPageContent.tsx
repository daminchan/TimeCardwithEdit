'use client';

import { useBreakpointValue } from '@chakra-ui/react';

import TimeCardEditPanel from '@/features/timeCard/components/edit/TimeCardEditPanel';
import MobileTimeCardEditPanel from '@/features/timeCard/mobile/components/edit/MobileTimeCardEditPanel';
import { TimeCardEditPanelProps } from '@/features/timeCard/mobile/types';

export default function TimeCardEditPageContent({
  users,
}: TimeCardEditPanelProps) {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return isMobile ? (
    <MobileTimeCardEditPanel users={users} />
  ) : (
    <TimeCardEditPanel users={users} />
  );
}
