import { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Editable,
  EditablePreview,
  EditableTextarea,
  Flex,
  Input,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useNotes } from '../../context/NotesContext';
import { useAuth } from '../../context/AuthContext';
import { Note as INote } from '../../interfaces/Note';
import { Comments } from '../';
import dayjs from 'dayjs';

interface IProps {
  note: INote;
}

const Note: React.FC<IProps> = ({ note }) => {
  const [descriptionText, setDescriptionText] = useState(
    note.description || ''
  );
  const [descriptionInput, setDescriptionInput] = useState('');
  const [editDescription, setEditDescription] = useState(false);

  const { user } = useAuth();
  const { deleteNote, updateNote, loading } = useNotes();
  const { _id, text, createdAt, createdBy, description } = note;

  const toast = useToast();

  const deleteIcon = <i className="fa-solid fa-circle-xmark"></i>;
  const createIcon = <i className="fa-solid fa-circle-check"></i>;

  const handleDelete = () => {
    toast({
      title: <Text fontSize="sm">Deleted: {note.text}</Text>,
      position: 'top',
      isClosable: true,
      status: 'error',
    });

    deleteNote(_id);
  };

  const handleUpdateDescription = (description: string) => {
    if (descriptionText !== note.description && descriptionText !== '') {
      const data = {
        description,
      };
      updateNote(_id, data);
    }
  };

  const handleAddDescription = (e: React.FormEvent) => {
    e.preventDefault();

    if (descriptionInput !== '') {
      const data = {
        description: descriptionInput,
      };
      updateNote(_id, data);
    }

    setDescriptionInput('');
    setEditDescription(false);
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescriptionText(e.target.value);
  };

  const handleEditButton = () => {
    setEditDescription(true);
  };

  return (
    <Box p={5} borderRadius={12} mb={4} backgroundColor="white">
      <Flex justifyContent="space-between" alignItems="center">
        <Box display="flex" gap={3} alignItems="center">
          <Avatar
            name={createdBy}
            size="xs"
            fontWeight="bold"
            src={user!.image}
          />
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

      <Divider my={2} />

      <Text fontWeight="bold">{text}</Text>

      {description ? (
        <Editable
          defaultValue={description}
          fontSize="sm"
          onSubmit={() => handleUpdateDescription(descriptionText)}
          selectAllOnFocus={false}
          my={1}
        >
          <EditablePreview />
          <EditableTextarea
            value={descriptionText}
            onChange={onChange}
            background="white"
          />
        </Editable>
      ) : (
        <>
          {editDescription ? (
            <form onSubmit={handleAddDescription}>
              <Box display="flex" gap={2}>
                <Input
                  background="white"
                  size="xs"
                  placeholder="Leave a comment..."
                  value={descriptionInput}
                  onChange={(e) => setDescriptionInput(e.target.value)}
                  autoFocus
                />
                <Button leftIcon={createIcon} size="xs" px={3} type="submit">
                  Add
                </Button>
              </Box>
            </form>
          ) : (
            <Button w="100%" size="xs" my={1} mt={3} onClick={handleEditButton}>
              Add description
            </Button>
          )}
        </>
      )}

      <Divider my={4} />

      <Comments note={note} />
    </Box>
  );
};

export default Note;
