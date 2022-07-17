import React, { useState } from 'react';
import { Box, Button, Input } from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';
import { useItems } from '../context/ItemContext';
import { useNotes } from '../context/NotesContext';

interface Props {
  tabIndex: number;
}

const Footer: React.FC<Props> = ({ tabIndex }) => {
  const [text, setText] = useState('');
  const { createItem, loading } = useItems();
  const { createNote } = useNotes();
  const { user } = useAuth();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const onSubmit = (e: React.FormEvent) => {
    setText('');
    e.preventDefault();

    if (tabIndex === 0) {
      const data = {
        name: text,
        createdBy: user!.name,
      };
      createItem(data);
    }

    if (tabIndex === 1) {
      const data = {
        text,
        createdBy: user!.name,
      };
      createNote(data);
    }
  };

  const firstTab = tabIndex === 0;
  const addIcon = <i className="fa-solid fa-circle-plus"></i>;

  return (
    <form onSubmit={onSubmit}>
      <Box
        position="fixed"
        bottom={0}
        right={0}
        left={0}
        background="gray.50"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={2}
        h="60px"
        borderTop="1px solid"
        borderColor="gray.200"
      >
        <>
          <Box>
            <Input
              placeholder={
                firstTab ? 'Add item to the list...' : 'Leave a note...'
              }
              bg="white"
              value={text}
              onChange={onChange}
              isRequired
            />
          </Box>
          <Box ml={1}>
            <Button
              type="submit"
              colorScheme="blue"
              isLoading={loading}
              leftIcon={addIcon}
            >
              {firstTab ? 'New item' : 'New note'}
            </Button>
          </Box>
        </>
      </Box>
    </form>
  );
};

export default Footer;
