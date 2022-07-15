import { useNotes } from '../../context/NotesContext';
import { Note } from '../';
import { Note as INote } from '../../interfaces/Note';

const NotesList: React.FC = () => {
  const { notes } = useNotes();

  return (
    <>
      {notes.map((note: INote) => (
        <Note key={note._id} note={note} />
      ))}
    </>
  );
};

export default NotesList;
