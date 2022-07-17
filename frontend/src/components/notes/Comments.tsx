import { useState } from 'react';
import { Avatar, Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import { Note } from '../../interfaces/Note';
import { useNotes } from '../../context/NotesContext';
import { useAuth } from '../../context/AuthContext';
import dayjs from 'dayjs';

const Comments: React.FC<{ note: Note }> = ({ note }) => {
  const [comment, setComment] = useState('');

  const { updateNote, loading } = useNotes();
  const { user } = useAuth();

  const { comments } = note;

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();

    if (comment !== '') {
      const data = {
        ...note,
        comments: [
          ...note.comments,
          {
            text: comment,
            createdBy: user!.name,
          },
        ],
      };
      updateNote(note._id, data);
    }

    setComment('');
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const createIcon = <i className="fa-solid fa-paper-plane"></i>;

  return (
    <>
      <Box
        bg="twitter.50"
        p={comments.length ? 1 : 0}
        pt={comments.length ? 2 : 0}
        borderRadius={comments.length ? 10 : 0}
        border={comments.length ? '1px solid' : 'none'}
        borderColor="twitter.100"
      >
        {comments.map((comment) => (
          <Flex
            key={Math.random()}
            gap={2}
            alignItems="flex-start"
            justifyContent="space-between"
            mb={1}
            p={1}
          >
            <Box display="flex" alignItems="flex-start" gap={2}>
              <Avatar size="2xs" name={comment.createdBy} />
              <Box>
                <Text fontSize="xs">{comment.text}</Text>
              </Box>
            </Box>

            <Box fontSize="xs" color="gray.400" minW="65px">
              {dayjs(comment.createdAt).format('MMM DD, HH:mm')}
            </Box>
          </Flex>
        ))}
      </Box>

      <form onSubmit={handleAddComment}>
        <Box display="flex" gap={2} mt={3}>
          <Input
            background="white"
            size="xs"
            placeholder="Leave a comment..."
            value={comment}
            onChange={onChange}
            isRequired
          />
          <Button
            type="submit"
            leftIcon={createIcon}
            size="xs"
            px={3}
            isLoading={loading}
          >
            Send
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Comments;
