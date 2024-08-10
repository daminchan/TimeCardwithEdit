'use client';
import React, { useEffect, useState } from 'react';

import {
  Box,
  Center,
  Spinner,
  Text,
  useBreakpointValue,
  Heading,
} from '@chakra-ui/react';

import FlexCol from '@/components/ui/FlexCol';

import TimeCardPanel from './TimeCardPanel';
import TimeCardViewTable from './TimeCardViewTable';
import MobileTimeCardView from '../mobile/components/MobileTimeCardView';
import { TimeCardViewProps } from '../types';

export default function TimeCardView({
  user,
  latestEntry,
  entries,
}: TimeCardViewProps) {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // ブレイクポイントの計算とデータの準備が完了したらローディングを解除
    setIsLoading(false);
  }, [isMobile]);

  if (isLoading) {
    return (
      <Box h="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (!user.id) {
    return <Text>ユーザーIDが見つかりません。</Text>;
  }

  if (isMobile) {
    return (
      <MobileTimeCardView
        user={user}
        latestEntry={latestEntry}
        entries={entries}
      />
    );
  }

  return (
    <Box>
      <FlexCol gap={12}>
        <Heading as="h1" size="2xl" textAlign="center">
          {user.name}のタイムカード
        </Heading>
        <TimeCardPanel latestEntry={latestEntry} userId={user.id} />
        <TimeCardViewTable entries={entries} />
      </FlexCol>
    </Box>
  );
}
