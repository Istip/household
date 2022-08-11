import { useNotes } from '../../context/NotesContext';
import { Note } from '../';
import { Note as INote } from '../../interfaces/Note';
import { Box } from '@chakra-ui/react';
import Loading from '../loading/Loading';

const NotesList: React.FC = () => {
  const { notes } = useNotes();

  return (
    <Box mb="118px">
      {notes.length === 0 && (
        <Box display="flex" justifyContent="center" alignItems="center" my={5}>
          <Loading />
        </Box>
      )}

      {notes.map((note: INote) => (
        <Note key={note._id} note={note} />
      ))}
    </Box>
  );
};

export default NotesList;
