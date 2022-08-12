import { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
} from '@chakra-ui/react';
import { Note } from '../../interfaces/Note';
import { useNotes } from '../../context/NotesContext';
import { useAuth } from '../../context/AuthContext';
import Comment from './Comment';

const Comments: React.FC<{ note: Note; marked: boolean }> = ({
  note,
  marked,
}) => {
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
            _id: `${Date.now().toString()}${Math.random()}`,
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
        bg={marked ? 'yellow.100' : 'gray.50'}
        p={comments.length ? 1 : 0}
        pt={comments.length ? 2 : 0}
        borderRadius={comments.length ? 10 : 0}
      >
        {comments.map((item) => (
          <Comment
            key={item._id}
            note={note}
            marked={marked}
            comment={item}
            comments={comments}
          />
        ))}
      </Box>

      <form onSubmit={handleAddComment}>
        <Box display="flex" gap={2} mt={3}>
          <InputGroup size="xs">
            <InputLeftAddon
              children={<Avatar size="2xs" name={user!.name} />}
            />
            <Input
              background="white"
              placeholder="Leave a comment..."
              value={comment}
              onChange={onChange}
              isRequired
            />
          </InputGroup>
          <Button
            type="submit"
            leftIcon={createIcon}
            size="xs"
            px={3}
            isLoading={loading}
            colorScheme={note.marked ? 'blackAlpha' : 'gray'}
          >
            Send
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Comments;
