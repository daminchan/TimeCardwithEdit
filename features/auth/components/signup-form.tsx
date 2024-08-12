'use client';

import { Box, FormControl, FormLabel, Input, Text } from '@chakra-ui/react';
import { useFormState } from 'react-dom';

import CustomButton from '@/components/button/CustomButton';
import FlexCol from '@/components/ui/FlexCol';
import { signUp } from '@/features/auth/actions/authAction';

interface SignUpFormProps {
  onSignUpComplete?: () => void;
}

export default function SignUpForm({ onSignUpComplete }: SignUpFormProps) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(signUp, initialState);

  return (
    <FlexCol>
      <form action={dispatch} className="w-full">
        <Box borderWidth={1} borderRadius="lg" p={6}>
          <FlexCol>
            <FormControl>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input
                id="name"
                type="text"
                name="name"
                placeholder="名前"
                required
                // _placeholder={{ color: 'gray.700' }}
              />
              {state.errors?.name &&
                state.errors.name.map((error: string) => (
                  <Text key={error} color="red.500" mt={2}>
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
                // _placeholder={{ color: 'gray.700' }}
              />
              {state.errors?.email &&
                state.errors.email.map((error: string) => (
                  <Text key={error} color="red.500" mt={2}>
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
                // _placeholder={{ color: 'gray.700' }}
              />
              {state.errors?.password &&
                state.errors.password.map((error: string) => (
                  <Text key={error} color="red.500">
                    {error}
                  </Text>
                ))}
            </FormControl>

            <CustomButton type="submit" width="100%">
              ユーザーを追加
            </CustomButton>
          </FlexCol>
        </Box>
        {state.message && (
          <Text color="red.500" mt={2}>
            {state.message}
          </Text>
        )}
      </form>
    </FlexCol>
  );
}

// 'use client';

// import { Box, FormControl, FormLabel, Input, Text } from '@chakra-ui/react';
// import { useFormState } from 'react-dom';

// import CustomButton from '@/components/button/CustomButton';
// import FlexCol from '@/components/ui/FlexCol';
// import { signUp } from '@/features/auth/actions/authAction';

// export default function SignUpForm() {
//   const initialState = { message: null, errors: {} };
//   const [state, dispatch] = useFormState(signUp, initialState);

//   return (
//     <FlexCol>
//       <form action={dispatch} className="w-full">
//         <Box borderWidth={1} borderRadius="lg" p={6}>
//           <FormControl>
//             <FormLabel htmlFor="name">Name</FormLabel>
//             <Input
//               id="name"
//               type="text"
//               name="name"
//               placeholder="名前"
//               required
//               // _placeholder={{ color: 'gray.700' }}
//             />
//             {state.errors?.name &&
//               state.errors.name.map((error: string) => (
//                 <Text key={error} color="red.500" mt={2}>
//                   {error}
//                 </Text>
//               ))}
//           </FormControl>

//           <FormControl>
//             <FormLabel htmlFor="email">Email</FormLabel>
//             <Input
//               id="email"
//               type="email"
//               name="email"
//               placeholder="メールアドレス"
//               required
//               // _placeholder={{ color: 'gray.700' }}
//             />
//             {state.errors?.email &&
//               state.errors.email.map((error: string) => (
//                 <Text key={error} color="red.500" mt={2}>
//                   {error}
//                 </Text>
//               ))}
//           </FormControl>

//           <FormControl>
//             <FormLabel htmlFor="password">Password</FormLabel>
//             <Input
//               id="password"
//               type="password"
//               name="password"
//               placeholder="パスワード"
//               required
//               // _placeholder={{ color: 'gray.700' }}
//             />
//             {state.errors?.password &&
//               state.errors.password.map((error: string) => (
//                 <Text key={error} color="red.500" mt={2}>
//                   {error}
//                 </Text>
//               ))}
//           </FormControl>

//           <CustomButton type="submit" colorScheme="blue" width="100%" mt={4}>
//             ユーザーを追加
//           </CustomButton>
//         </Box>
//         {state.message && (
//           <Text color="red.500" mt={2}>
//             {state.message}
//           </Text>
//         )}
//       </form>
//     </FlexCol>
//   );
// }
