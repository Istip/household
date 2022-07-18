import { useEffect, useState } from 'react';
import { Box, Button, Text, useToast } from '@chakra-ui/react';
import axios from '../../helpers/axios';
import Spin from '../Spin';

interface Expense {
  _id: string;
  amount: number;
  user: string;
}

const ExpenseList: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const getExpenses = () => {
    setLoading(true);

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
      })
      .finally(() => setLoading(false));
  };

  const deleteExpense = (id: string) => {
    setLoading(true);

    axios
      .delete(`/expenses/${id}`)
      .then((res) => {
        setExpenses((prevExpenses) => {
          return prevExpenses.filter((expense) => expense._id !== id);
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
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

  if (loading) {
    return <Spin />;
  }

  return (
    <>
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
            <Box>
              <i className="fa-solid fa-clock"></i> 2020.20.12
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
                onClick={() => deleteExpense(expense._id)}
              >
                <i className="fa-solid fa-circle-xmark"></i>
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default ExpenseList;
