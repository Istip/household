import { useNotes } from '../../context/NotesContext';
import { Note } from '../';
import { Note as INote } from '../../interfaces/Note';
import { Box } from '@chakra-ui/react';

const NotesList: React.FC = () => {
  const { notes } = useNotes();

  return (
    <Box mb="60px">
      {notes.map((note: INote) => (
        <Note key={note._id} note={note} />
      ))}
    </Box>
  );
};

export default NotesList;
