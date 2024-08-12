import { Heading, Text } from '@chakra-ui/react';
import { User } from 'next-auth';

import FlexCol from '@/components/ui/FlexCol';

type UserDetailsProps = {
  user: Partial<User>;
};

export default function UserDetails({ user }: UserDetailsProps) {
  return (
    <FlexCol gap={2}>
      <Heading as="h2" size="lg" color="gray.500">
        ユーザー情報
      </Heading>
      <Text color="gray.500">
        <strong>名前:</strong> {user.name || '未設定'}
      </Text>
      <Text color="gray.500">
        <strong>メールアドレス:</strong> {user.email || '未設定'}
      </Text>
      <Text color="gray.500">
        <strong>ユーザーID:</strong> {user.id || '未設定'}
      </Text>
      <Text color="gray.500">
        <strong>ユーザーRole:</strong> {user.role || '未設定'}
      </Text>
    </FlexCol>
  );
}
