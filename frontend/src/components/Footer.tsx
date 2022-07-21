import { useEffect, useState } from 'react';
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
import { Expense } from '../interfaces/Expense';
import axios from '../helpers/axios';

interface Props {
  tabIndex: number;
  expenses: Expense[];
  setExpenses: (expenses: Expense[]) => void;
}

interface Operation {
  icon: JSX.Element;
  function: () => void;
  text: string;
  type: 'text' | 'number';
  colorScheme: 'blue' | 'yellow' | 'green' | 'red';
  placeholder: string;
}

const Footer: React.FC<Props> = ({ tabIndex, expenses, setExpenses }) => {
  const [text, setText] = useState('');
  const [expenseColor, setExpenseColor] = useState<'red' | 'green'>('green');

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
      placeholder: 'Leave a note...',
    },
    {
      icon: <i className="fa-solid fa-money-bill-wave"></i>,
      function: () => {
        createExpense({ amount: text });
      },
      text: 'New Expense',
      type: 'number',
      colorScheme: expenseColor,
      placeholder: 'Enter the ammount...',
    },
  ];

  const createExpense = (data: { amount: string }) => {
    axios
      .post('/expenses', data)
      .then((res) => {
        setExpenses([res.data, ...expenses]);
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

  useEffect(() => {
    if (tabIndex === 2 && text !== '') {
      setExpenseColor(parseInt(text) > 0 ? 'green' : 'red');
    }
    // eslint-disable-next-line
  }, [text]);

  return (
    <form onSubmit={onSubmit}>
      <Box
        position="fixed"
        bottom="60px"
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
          <InputGroup size="sm">
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
            />
          </InputGroup>
        </Box>
        <Box ml={1}>
          <Button
            type="submit"
            colorScheme={tabOperations[tabIndex].colorScheme}
            isLoading={loading}
            size="sm"
          >
            {tabOperations[tabIndex].text}
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default Footer;
