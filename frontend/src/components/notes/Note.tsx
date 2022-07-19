import { Avatar, Box, Divider, Flex, Text, useToast } from '@chakra-ui/react';
import { useNotes } from '../../context/NotesContext';
import { Note as INote } from '../../interfaces/Note';
import { Comments } from '../';
import dayjs from 'dayjs';

interface IProps {
  note: INote;
}

const Note: React.FC<IProps> = ({ note }) => {
  const { deleteNote, loading } = useNotes();
  const { _id, text, createdAt, createdBy } = note;

  const toast = useToast();

  const deleteIcon = <i className="fa-solid fa-circle-xmark"></i>;

  const handleDelete = () => {
    toast({
      title: <Text fontSize="sm">Deleted: {note.text}</Text>,
      position: 'top',
      isClosable: true,
      status: 'error',
    });

    deleteNote(_id);
  };

  return (
    <Box p={5} borderRadius={12} mb={4} backgroundColor="white">
      <Flex justifyContent="space-between" alignItems="center">
        <Box display="flex" gap={3} alignItems="center">
          <Avatar name={createdBy} size="xs" fontWeight="bold" />
          <Box display="flex" gap={1}>
            <Text color="gray.400" fontSize="xs">
              <i className="fa-solid fa-clock"></i>
            </Text>
            <Text color="gray.500" fontSize="xs">
              {dayjs(createdAt).format('MMMM DD HH:mm')}
            </Text>
          </Box>
        </Box>
        {!loading ? (
          <Text color="red.400" p={-1} onClick={handleDelete}>
            {deleteIcon}
          </Text>
        ) : (
          <Box></Box>
        )}
      </Flex>

      <Divider my={4} />
      <Text fontWeight="bold">{text}</Text>
      <Divider my={4} />
      <Comments note={note} />
    </Box>
  );
};

export default Note;
