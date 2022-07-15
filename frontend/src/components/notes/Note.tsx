import {
  Avatar,
  Box,
  Button,
  Divider,
  Editable,
  EditablePreview,
  EditableTextarea,
  Flex,
  Text,
} from '@chakra-ui/react';
import { Note as INote } from '../../interfaces/Note';
import dayjs from 'dayjs';
import NoteComments from './NoteComments';

interface IProps {
  note: INote;
}

const Note: React.FC<IProps> = ({ note }) => {
  const { text, createdAt, createdBy, description } = note;

  const trashIcon = <i className="fa-solid fa-trash"></i>;

  return (
    <Box
      p={5}
      border="1px solid"
      borderRadius={4}
      mb={2}
      borderColor="yellow.300"
      backgroundColor="yellow.50"
    >
      <Flex justifyContent="space-between" alignItems="center">
        <Box display="flex" gap={1}>
          <Text color="gray.400" fontSize="xs">
            <i className="fa-solid fa-clock"></i>
          </Text>
          <Text color="gray.500" fontSize="xs">
            {dayjs(createdAt).format('MMMM DD HH:mm')}
          </Text>
        </Box>
        <Avatar name={createdBy} size="xs" fontWeight="bold" />
      </Flex>

      <Divider my={2} />

      <Text fontWeight="bold">{text}</Text>

      {description ? (
        <Editable
          defaultValue={description}
          fontSize="sm"
          // onSubmit={() => handleUpdate(text)}
          selectAllOnFocus={false}
          my={1}
        >
          <EditablePreview />
          <EditableTextarea
            value={text}
            // onChange={onChange}
            background="white"
          />
        </Editable>
      ) : (
        <Button w="100%" size="xs">
          Add description
        </Button>
      )}

      <Button
        leftIcon={trashIcon}
        w="100%"
        size="sm"
        mt={3}
        colorScheme="yellow"
      >
        DELETE
      </Button>

      <Divider my={4} />

      <NoteComments />
    </Box>
  );
};

export default Note;
