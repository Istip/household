import { useNotes } from '../../context/NotesContext';
import { Note } from '../';
import { Note as INote } from '../../interfaces/Note';
import { Box, Flex, Spinner, Text } from '@chakra-ui/react';

const NotesList: React.FC = () => {
  const { notes, loading } = useNotes();

  if (loading) {
    return (
      <Flex justifyContent="center" p={5}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Flex>
    );
  }

  return (
    <Box mb="110px">
      {notes.length === 0 && (
        <Box display="flex" justifyContent="center" alignItems="center" my={5}>
          <Text fontSize="xl" fontWeight="bold" color="gray.400">
            You don't have any notes...
          </Text>
        </Box>
      )}

      {notes.map((note: INote) => (
        <Note key={note._id} note={note} />
      ))}
    </Box>
  );
};

export default NotesList;
