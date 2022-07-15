import { createContext, useContext, useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import axios from '../helpers/axios';
import { Note } from '../interfaces/Note';

interface IState {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[] | []>>;
  loading: boolean;
  updateNote: (id: string, data: object) => void;
  deleteNote: (id: string) => void;
  createNote: (data: newNote) => void;
}

interface newNote {
  text: string;
  createdBy: string;
}

const NoteContext = createContext({} as IState);

export const NoteProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notes, setNotes] = useState<Note[] | []>([]);
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const fetchNotes = () => {
    axios.get('/notes').then((res) => {
      setNotes(res.data);
    });
  };

  const updateNote = (id: string, data: object) => {
    setLoading(true);

    axios
      .put(`/notes/${id}`, data)
      .then((res) => {
        setNotes((prevNotes) => {
          return prevNotes.map((note) => {
            if (note._id === id) {
              return { ...note, ...data };
            }
            return note;
          });
        });
      })
      .catch((err) => {
        toast({
          title: 'Could not update note!',
          position: 'top',
          isClosable: true,
          status: 'error',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const createNote = (data: newNote) => {
    setLoading(true);

    axios
      .post('/notes', data)
      .then((res) => {
        setNotes((prevNotes) => [res.data, ...prevNotes]);
      })
      .catch((err) => {
        toast({
          title: 'Could not create new note!',
          position: 'top',
          isClosable: true,
          status: 'error',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const deleteNote = (id: string) => {
    setLoading(true);

    axios
      .delete(`/notes/${id}`)
      .then((res) => {
        setNotes((prevNotes) => {
          return prevNotes.filter((note) => note._id !== id);
        });
      })
      .catch((err) => {
        toast({
          title: 'Could not delete note!',
          position: 'top',
          isClosable: true,
          status: 'error',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    return fetchNotes();
    // eslint-disable-next-line
  }, []);

  return (
    <NoteContext.Provider
      value={{ notes, setNotes, loading, updateNote, deleteNote, createNote }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export const useNotes = () => {
  return useContext(NoteContext);
};
export default NoteProvider;
