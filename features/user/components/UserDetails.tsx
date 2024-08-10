import { Heading, Text } from '@chakra-ui/react';
import { User } from 'next-auth';

import FlexCol from '@/components/ui/FlexCol';

type UserDetailsProps = {
  user: Partial<User>;
};

export default function UserDetails({ user }: UserDetailsProps) {
  return (
    <FlexCol gap={2}>
      <Heading as="h2" size="lg">
        ユーザー情報
      </Heading>
      <Text>
        <strong>名前:</strong> {user.name || '未設定'}
      </Text>
      <Text>
        <strong>メールアドレス:</strong> {user.email || '未設定'}
      </Text>
      <Text>
        <strong>ユーザーID:</strong> {user.id || '未設定'}
      </Text>
      <Text>
        <strong>ユーザーRole:</strong> {user.role || '未設定'}
      </Text>
    </FlexCol>
  );
}
