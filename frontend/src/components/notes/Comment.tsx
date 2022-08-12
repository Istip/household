import { Avatar, Box, Button, Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { Comment as IComment, Note } from '../../interfaces/Note';
import { useNotes } from '../../context/NotesContext';
import dayjs from 'dayjs';

interface Props {
  note: Note;
  marked: boolean;
  comment: IComment;
  comments: IComment[];
}

const Comment: React.FC<Props> = ({ note, marked, comment, comments }) => {
  const [isDelete, setIsDelete] = useState(false);
  const { updateNote, loading } = useNotes();

  const handleRemoveComment = (id: string) => {
    const filteredComments = comments.filter((comment) => comment._id !== id);
    const data = { ...note, comments: filteredComments };

    updateNote(note._id, data);
  };

  const trashIcon = <i className="fa-solid fa-trash"></i>;
  const backIcon = <i className="fa-solid fa-arrow-left"></i>;

  return (
    <Flex
      gap={2}
      alignItems="flex-start"
      justifyContent="space-between"
      mb={1}
      p={1}
      position="relative"
    >
      {isDelete && (
        <Flex
          gap={2}
          w="100%"
          position="absolute"
          top="0"
          bottom="0"
          left="0"
          right="0"
          zIndex={1}
          justifyContent="center"
          alignItems="center"
          borderRadius="md"
          p={2}
        >
          <Button
            w="100%"
            size="xs"
            colorScheme={marked ? 'blackAlpha' : 'gray'}
            isLoading={loading}
            onClick={() => setIsDelete(false)}
          >
            {backIcon}
          </Button>
          <Button
            w="100%"
            size="xs"
            colorScheme="red"
            isLoading={loading}
            onClick={() => handleRemoveComment(comment._id)}
          >
            {trashIcon}
          </Button>
        </Flex>
      )}
      <Box w="100%" h="100%">
        <Box
          display="flex"
          alignItems="flex-start"
          gap={2}
          onClick={() => setIsDelete((prev) => !prev)}
        >
          <Avatar
            opacity={isDelete ? 0 : 1}
            size="2xs"
            name={comment.createdBy}
          />
          <Box opacity={isDelete ? 0 : 1}>
            <Text fontSize="xs">{comment.text}</Text>
          </Box>
        </Box>
      </Box>
      <Box
        fontSize="8px"
        color={marked ? 'yellow.600' : 'gray.400'}
        minW="50px"
        opacity={isDelete ? 0 : 1}
      >
        {dayjs(comment.createdAt).format('MMM DD, HH:mm')}
      </Box>
    </Flex>
  );
};
export default Comment;
