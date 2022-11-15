import {
  Box,
  Button,
  Center,
  Input,
  InputGroup,
  InputLeftAddon,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Text,
  useToast,
} from '@chakra-ui/react';
import axios from '../../helpers/axios';
import dayjs from 'dayjs';
import { IExpense } from '../../interfaces/Expense';
import { useState } from 'react';

interface Props {
  expenses: IExpense[];
  setExpenses: (expenses: IExpense[]) => void;
  expense: IExpense;
  getExpenses: () => void;
}

const Expense: React.FC<Props> = ({
  expenses,
  expense,
  setExpenses,
  getExpenses,
}) => {
  const [description, setDescription] = useState('');

  const toast = useToast();

  const deleteExpense = (id: string, amount: number) => {
    axios
      .delete(`/expenses/${id}`)
      .then((res) => {
        const deleteExpense = expenses.filter(
          (expense: IExpense) => expense._id !== id
        );
        setExpenses(deleteExpense);

        toast({
          title: <Text fontSize="sm">Deleted expense: {amount}</Text>,
          position: 'top',
          isClosable: true,
          status: 'success',
        });
      })
      .catch((err) => {
        toast({
          title: err.response.data.message,
          position: 'top',
          isClosable: true,
          status: 'error',
        });
      });
  };

  const updateExpense = (id: string, description: string) => {
    axios
      .put(`/expenses/${id}`, { description })
      .then(() => {
        const updateExpense = expenses.map((expense: IExpense) => {
          return expense._id === id ? { ...expense, description } : expense;
        });

        setExpenses(updateExpense);
      })
      .then(() => {
        getExpenses();
      });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateExpense(expense._id, description);
  };

  return (
    <Box>
      <Popover>
        <PopoverTrigger>
          <Box
            w="100%"
            key={expense._id}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            fontSize="xs"
            p={1}
            background={expense.amount >= 0 ? 'green.50' : 'red.50'}
          >
            <Box color="gray.600" pl={2} w="105px">
              <i className="fa-solid fa-clock"></i>{' '}
              {dayjs(expense.createdAt).format('MMM DD, HH:mm')}
            </Box>

            {expense.description && (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                pr={1}
              >
                <Text
                  fontSize="xx-small"
                  as="span"
                  color={expense.amount >= 0 ? 'green.300' : 'red.300'}
                  textAlign="center"
                >
                  {expense.description.substring(0, 30)}
                  {expense.description.length > 30 && '...'}
                </Text>
              </Box>
            )}

            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box>
                <Box fontWeight="bold">{expense.amount}</Box>
              </Box>
              <Button
                size="xs"
                colorScheme="red"
                px={2}
                variant="ghost"
                onClick={() => deleteExpense(expense._id, expense.amount)}
              >
                <i className="fa-solid fa-circle-xmark"></i>
              </Button>
            </Box>
          </Box>
        </PopoverTrigger>

        <Center>
          <PopoverContent px={2} py={4} pr={expense.description ? 6 : 10}>
            <PopoverArrow />
            <PopoverCloseButton />

            {expense.description ? (
              <Text as="div" fontSize="sm" fontWeight="bold" lineHeight="4">
                <Text
                  as="span"
                  color={expense.amount > 0 ? 'green' : 'red'}
                  mr={1}
                >
                  {expense.amount} lei:
                </Text>
                <Text as="span" color="gray.600">
                  {expense.description}
                </Text>
              </Text>
            ) : (
              <form onSubmit={onSubmit}>
                <Box display="flex" gap={2}>
                  <InputGroup size="sm">
                    <InputLeftAddon
                      children={<i className="fa-solid fa-circle-question"></i>}
                    />
                    <Input
                      isRequired
                      type="text"
                      value={description}
                      onChange={onChange}
                      placeholder="Enter expense description"
                    />
                  </InputGroup>

                  <Button size="sm" colorScheme="blue" type="submit">
                    ADD
                  </Button>
                </Box>
              </form>
            )}
          </PopoverContent>
        </Center>
      </Popover>
    </Box>
  );
};

export default Expense;
