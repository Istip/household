import { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  ScaleFade,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useNotes } from '../../context/NotesContext';
import { Note as INote } from '../../interfaces/Note';
import { Comments } from '../';
import dayjs from 'dayjs';

interface IProps {
  note: INote;
}

const Note: React.FC<IProps> = ({ note }) => {
  const [confirm, setConfirm] = useState(false);
  const { deleteNote, updateNote, loading } = useNotes();
  const { _id, text, createdAt, createdBy, marked } = note;
  const [isMarked, setIsMarked] = useState(marked);

  const { isOpen, onToggle } = useDisclosure();

  const toast = useToast();

  const deleteIcon = <i className="fa-solid fa-circle-xmark"></i>;
  const confirmIcon = <i className="fa-solid fa-circle-check"></i>;
  const bookmarkIcon = <i className="fa-solid fa-bookmark"></i>;
  const clockIcon = <i className="fa-solid fa-clock"></i>;

  const handleDelete = () => {
    toast({
      title: <Text fontSize="sm">Deleted: {note.text}</Text>,
      position: 'top',
      isClosable: true,
      status: 'success',
    });

    deleteNote(_id);
  };

  const handleMark = () => {
    const data = {
      ...note,
      marked: !isMarked,
    };
    updateNote(note._id, data);
    setIsMarked(!isMarked);
  };

  return (
    <Box
      p={5}
      borderRadius={12}
      mb={4}
      backgroundColor={marked ? 'yellow.50' : 'white'}
      boxShadow="lg"
      border="1px solid"
      borderColor={marked ? 'yellow.400' : 'gray.200'}
      position="relative"
    >
      <Flex position="absolute" top="-12px" left="-6px" color="yellow.500">
        <Button
          position="absolute"
          colorScheme={marked ? 'yellow' : 'gray'}
          border="1px solid"
          borderColor={!marked ? 'yellow.500' : 'yellow.400'}
          borderRadius="full"
          onClick={handleMark}
          size="xs"
          w="24px"
          h="24px"
          isLoading={loading}
        >
          {bookmarkIcon}
        </Button>
      </Flex>
      <Flex justifyContent="space-between" alignItems="center">
        <Box display="flex" gap={3} alignItems="center">
          <Avatar name={createdBy} size="xs" fontWeight="bold" />
          <Box display="flex" gap={1}>
            <Text color="gray.400" fontSize="xs">
              {clockIcon}
            </Text>
            <Text color="gray.500" fontSize="xs">
              {dayjs(createdAt).format('MMMM DD HH:mm')}
            </Text>
          </Box>
        </Box>
        {!loading ? (
          <Box display="flex" gap={2}>
            <ScaleFade initialScale={0.1} in={isOpen}>
              {confirm && (
                <Text color="red.400" p={-1} onClick={handleDelete}>
                  {confirmIcon}
                </Text>
              )}
            </ScaleFade>
            <Text
              color={confirm ? 'gray.600' : 'red.400'}
              p={-1}
              onClick={() => {
                onToggle();
                setConfirm(!confirm);
              }}
            >
              {deleteIcon}
            </Text>
          </Box>
        ) : null}
      </Flex>

      <Divider my={4} bg="gray.200" />
      <Text fontWeight="bold">{text}</Text>
      <Divider my={4} bg="gray.200" />
      <Comments note={note} marked={marked} />
    </Box>
  );
};

export default Note;
