import { useState } from 'react';
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  useToast,
} from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';
import { useItems } from '../context/ItemContext';
import { useNotes } from '../context/NotesContext';
import { IExpense } from '../interfaces/Expense';
import axios from '../helpers/axios';

interface Props {
  tabIndex: number;
  expenses: IExpense[];
  setExpenses: (expenses: IExpense[]) => void;
}

interface Operation {
  icon: JSX.Element;
  function: () => void;
  text: string | JSX.Element;
  type: 'text' | 'number';
  colorScheme: 'blue' | 'yellow' | 'green';
  placeholder: string;
  gradient: string;
}

const Footer: React.FC<Props> = ({ tabIndex, expenses, setExpenses }) => {
  const [text, setText] = useState<string>('');

  const { createItem, loading } = useItems();
  const { createNote } = useNotes();
  const { user } = useAuth();

  const toast = useToast();

  const tabOperations: Operation[] = [
    {
      icon: <i className="fa-solid fa-cart-shopping"></i>,
      function: () => {
        createItem({ name: text, createdBy: user!.name });
      },
      text: 'New Item',
      type: 'text',
      colorScheme: 'blue',
      gradient: 'linear(to-bl, #0093E9, #80D0C7)',
      placeholder: 'Add item to the list...',
    },
    {
      icon: <i className="fa-solid fa-comment-dots"></i>,
      function: () => {
        createNote({ text, createdBy: user!.name });
      },
      text: 'New Note',
      type: 'text',
      colorScheme: 'yellow',
      gradient: 'linear(to-bl, #85FFBD, #FFFB7D)',
      placeholder: 'Leave a note...',
    },
    {
      icon: <i className="fa-solid fa-money-bill-wave"></i>,
      function: () => {
        return createExpense({ amount: text });
      },
      text: <i className="fa-solid fa-circle-plus fa-lg"></i>,
      type: 'number',
      colorScheme: 'green',
      gradient: 'linear(to-bl, #16A085, #5ddb09)',
      placeholder: 'Enter the ammount...',
    },
  ];

  const createExpense = (data: { amount: string | number }) => {
    axios
      .post('/expenses', data)
      .then((res) => {
        setExpenses([res.data, ...expenses]);
        setText('');
      })
      .catch((err) => {
        toast({
          title: 'Could not add new expense!',
          position: 'top',
          isClosable: true,
          status: 'error',
        });
      });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setText('');
    tabOperations[tabIndex].function();
  };

  const ExtraButton = () => {
    return (
      <>
        {tabIndex === 2 && (
          <Button
            colorScheme="red"
            bgGradient="linear(to-bl, red.700, red.500)"
            mr={1}
            isLoading={loading}
            onClick={() => {
              return createExpense({ amount: -Math.abs(parseInt(text)) });
            }}
          >
            <i className="fa-solid fa-circle-minus fa-lg"></i>
          </Button>
        )}
      </>
    );
  };

  return (
    <form onSubmit={onSubmit}>
      <Box
        position="fixed"
        bottom="59px"
        right={0}
        left={0}
        background="gray.50"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={2}
        borderTop="1px solid"
        borderColor="gray.200"
        zIndex={2}
      >
        <Box w="100%">
          <InputGroup>
            <InputLeftAddon
              children={tabOperations[tabIndex].icon}
              borderRadius="6px"
            />
            <Input
              placeholder={tabOperations[tabIndex].placeholder}
              bg="white"
              value={text}
              onChange={onChange}
              isRequired
              type={tabOperations[tabIndex].type}
              borderRadius="6px"
              min={0}
            />
          </InputGroup>
        </Box>
        <Box ml={1} display="flex">
          <ExtraButton />
          <Button
            type="submit"
            colorScheme={tabOperations[tabIndex].colorScheme}
            isLoading={loading}
            bgGradient={tabOperations[tabIndex].gradient}
          >
            {tabOperations[tabIndex].text}
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default Footer;
