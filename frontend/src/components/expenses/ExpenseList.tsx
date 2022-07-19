import { useEffect } from 'react';
import { Box, Button, Text, useToast } from '@chakra-ui/react';
import axios from '../../helpers/axios';
import { Expense } from '../../interfaces/Expense';
import dayjs from 'dayjs';

interface Props {
  expenses: Expense[];
  setExpenses: (expenses: Expense[]) => void;
}

const ExpenseList: React.FC<Props> = ({ expenses, setExpenses }) => {
  const toast = useToast();

  const getExpenses = () => {
    axios
      .get('/expenses')
      .then((res) => {
        setExpenses(res.data);
      })
      .catch((err) => {
        toast({
          title: <Text fontSize="sm">{err.response.data.message}</Text>,
          position: 'top',
          isClosable: true,
          status: 'error',
        });
      });
  };

  const deleteExpense = (id: string, amount: number) => {
    axios
      .delete(`/expenses/${id}`)
      .then((res) => {
        const deleteExpense = expenses.filter(
          (expense: Expense) => expense._id !== id
        );
        setExpenses(deleteExpense);

        toast({
          title: <Text fontSize="sm">Deleted expense: {amount}</Text>,
          position: 'top',
          isClosable: true,
          status: 'error',
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

  const totalExpenses =
    expenses.length &&
    expenses.reduce((acc, curr) => {
      return acc + curr.amount;
    }, 0);

  useEffect(() => {
    getExpenses();
    // eslint-disable-next-line
  }, [expenses.length]);

  return (
    <Box mb="110px">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        background="gray.50"
        p={5}
        borderRadius="10px"
      >
        <Box>
          <Text fontWeight="bold" fontSize="2xl">
            TOTAL:
          </Text>
        </Box>

        <Box>
          <Text
            fontWeight="bold"
            fontSize="2xl"
            color={totalExpenses <= 0 ? 'red' : 'green'}
          >
            {totalExpenses.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </Text>
        </Box>
      </Box>

      {!expenses.length && (
        <Box display="flex" justifyContent="center" alignItems="center" my={5}>
          <Text fontSize="xl" fontWeight="bold" color="gray.400">
            Add your expenses...
          </Text>
        </Box>
      )}

      <Box mt={2}>
        {expenses.map((expense) => (
          <Box
            key={expense._id}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            fontSize="xs"
            p={1}
            background={expense.amount >= 0 ? 'green.50' : 'red.50'}
          >
            <Box color="gray.600" pl={2}>
              <i className="fa-solid fa-clock"></i>{' '}
              {dayjs(expense.createdAt).format('MMM DD, HH:mm')}
            </Box>

            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              gap={2}
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
        ))}
      </Box>
    </Box>
  );
};

export default ExpenseList;
