'use client';

import { FormControl, FormLabel, Input, Text } from '@chakra-ui/react';
import { useFormState } from 'react-dom';

import CustomButton from '@/components/button/CustomButton';
import FlexCol from '@/components/ui/FlexCol';
import { signUp } from '@/features/auth/actions/authAction';

interface MobileSignUpFormProps {
  onSignUpComplete?: () => void;
}

export default function MobileSignUpForm({
  onSignUpComplete,
}: MobileSignUpFormProps) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(signUp, initialState);

  return (
    <FlexCol>
      <form action={dispatch} className="w-full">
        <FlexCol gap={4}>
          <FormControl>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              id="name"
              type="text"
              name="name"
              placeholder="名前"
              required
              bg="gray.700"
              color="gray.200"
              _placeholder={{ color: 'gray.400' }}
            />
            {state.errors?.name &&
              state.errors.name.map((error: string) => (
                <Text key={error} color="red.300" fontSize="sm" mt={1}>
                  {error}
                </Text>
              ))}
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="メールアドレス"
              required
              bg="gray.700"
              color="gray.200"
              _placeholder={{ color: 'gray.400' }}
            />
            {state.errors?.email &&
              state.errors.email.map((error: string) => (
                <Text key={error} color="red.300" fontSize="sm" mt={1}>
                  {error}
                </Text>
              ))}
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="パスワード"
              required
              bg="gray.700"
              color="gray.200"
              _placeholder={{ color: 'gray.400' }}
            />
            {state.errors?.password &&
              state.errors.password.map((error: string) => (
                <Text key={error} color="red.300" fontSize="sm" mt={1}>
                  {error}
                </Text>
              ))}
          </FormControl>

          <CustomButton type="submit" width="100%" mt={2}>
            ユーザーを追加
          </CustomButton>
        </FlexCol>
        {state.message && (
          <Text color="red.300" mt={2} fontSize="sm">
            {state.message}
          </Text>
        )}
      </form>
    </FlexCol>
  );
}
