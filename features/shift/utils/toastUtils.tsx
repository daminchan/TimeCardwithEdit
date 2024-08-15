import {
  Box,
  Button,
  Flex,
  Text,
  ToastId,
  UseToastOptions,
} from '@chakra-ui/react';

export const createShiftActionToast = (
  action: '更新' | '追加' | '削除',
  onConfirm: () => Promise<void>,
  toast: (options: UseToastOptions) => ToastId
): UseToastOptions => ({
  render: ({ onClose }) => (
    <Box p={4} bg="gray.500" color="white" borderRadius="md">
      <Flex direction="column" alignItems="center">
        <Box textAlign="center" mb={3}>
          <Text fontWeight="bold" fontSize="lg">
            シフトを{action}しますか？
          </Text>
          <Text fontSize="sm">
            シフトの{action}を行います。よろしいですか？
          </Text>
        </Box>
        <Button
          size="md"
          onClick={async () => {
            onClose();
            try {
              await onConfirm();
              toast({
                title: `シフトを${action}しました`,
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top',
              });
              // ここでシフトリストを更新するロジックを追加
            } catch (error) {
              console.error(`Shift ${action} failed:`, error);
              toast({
                title: `シフトの${action}に失敗しました`,
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top',
              });
            }
          }}
        >
          確認
        </Button>
      </Flex>
    </Box>
  ),
  duration: null,
  isClosable: true,
  position: 'top',
});
