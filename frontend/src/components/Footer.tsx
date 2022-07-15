import React, { useState } from 'react';
import { Box, Button, Input } from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';
import { useItems } from '../context/ItemContext';
import { ErrorMessage } from './';

interface Props {
  tabIndex: number;
}

const Footer: React.FC<Props> = ({ tabIndex }) => {
  const [text, setText] = useState('');
  const { createItem, loading, error } = useItems();
  const { user } = useAuth();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      name: text,
      createdBy: user!.name,
    };
    createItem(data);
    setText('');
  };

  const firstTab = tabIndex === 0;

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
              placeholder={firstTab ? 'Enter item to buy' : 'Leave a note'}
              bg="white"
              value={text}
              onChange={onChange}
              isRequired
            />
          </Box>
          <Box ml={1}>
            <Button type="submit" colorScheme="blue" isLoading={loading}>
              {firstTab ? 'New item' : 'New note'}
            </Button>
          </Box>
        </>

        {error && (
          <Box mt={2}>
            <ErrorMessage>{error}</ErrorMessage>
          </Box>
        )}
      </Box>
    </form>
  );
};

export default Footer;
