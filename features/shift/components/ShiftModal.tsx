import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

import { EditedShift } from '../types';

interface ShiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  editedShift: EditedShift;
  setEditedShift: React.Dispatch<React.SetStateAction<EditedShift>>;
  onSubmit: () => void;
  headerText: string;
  submitButtonText: string;
}

export const ShiftModal: React.FC<ShiftModalProps> = ({
  isOpen,
  onClose,
  editedShift,
  setEditedShift,
  onSubmit,
  headerText,
  submitButtonText,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{headerText}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mt={4}>
            <FormLabel>開始時間</FormLabel>
            <Input
              type="datetime-local"
              value={editedShift.startTime}
              onChange={(e) =>
                setEditedShift({ ...editedShift, startTime: e.target.value })
              }
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>終了時間</FormLabel>
            <Input
              type="datetime-local"
              value={editedShift.endTime}
              onChange={(e) =>
                setEditedShift({ ...editedShift, endTime: e.target.value })
              }
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onSubmit}>
            {submitButtonText}
          </Button>
          <Button variant="ghost" onClick={onClose}>
            キャンセル
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
