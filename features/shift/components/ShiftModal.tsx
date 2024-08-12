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
  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartTime = e.target.value;
    setEditedShift((prev) => {
      const newEndTime = synchronizeDate(newStartTime, prev.endTime);
      return { ...prev, startTime: newStartTime, endTime: newEndTime };
    });
  };

  const synchronizeDate = (startTime: string, endTime: string) => {
    const [startDate, startTimeOnly] = startTime.split('T');
    const [, endTimeOnly] = endTime.split('T');
    return `${startDate}T${endTimeOnly}`;
  };

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
              onChange={handleStartTimeChange}
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
          <Button mr={3} onClick={onSubmit}>
            {submitButtonText}
          </Button>
          <Button onClick={onClose}>キャンセル</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
