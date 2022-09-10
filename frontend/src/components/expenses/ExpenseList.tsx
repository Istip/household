import { useEffect } from 'react';
import { Box, Text, useToast } from '@chakra-ui/react';
import axios from '../../helpers/axios';
import { IExpense } from '../../interfaces/Expense';
import Expense from './Expense';
import ExpenseTotal from './ExpenseTotal';
import dayjs from 'dayjs';

interface Props {
  expenses: IExpense[];
  setExpenses: (expenses: IExpense[]) => void;
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

  useEffect(() => {
    getExpenses();
    // eslint-disable-next-line
  }, [expenses.length]);

  const getDate = (index: number): any => {
    if (index !== 0 && expenses[index - 1].createdAt) {
      return (
        dayjs(expenses[index - 1].createdAt).format('MM') !==
        dayjs(expenses[index].createdAt).format('MM')
      );
    }
  };

  return (
    <Box mb="110px">
      <ExpenseTotal expenses={expenses} />

      {!expenses.length && (
        <Box display="flex" justifyContent="center" alignItems="center" my={5}>
          <Text fontSize="xl" fontWeight="bold" color="gray.400">
            Add your expenses...
          </Text>
        </Box>
      )}

      <Box mt={2}>
        {expenses.map((expense: IExpense, index: number) => (
          <Box key={expense._id}>
            {getDate(index) && (
              <Text fontWeight="bold" fontSize="sm" mt={2} color="blue.500">
                {dayjs(expense.createdAt).format('MMMM')}:
              </Text>
            )}
            <Expense
              expenses={expenses}
              expense={expense}
              setExpenses={setExpenses}
              getExpenses={getExpenses}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ExpenseList;
