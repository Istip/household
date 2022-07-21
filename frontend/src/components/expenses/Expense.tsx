import { Box, Button, Text, useToast } from '@chakra-ui/react';
import axios from '../../helpers/axios';
import dayjs from 'dayjs';
import { IExpense } from '../../interfaces/Expense';

interface Props {
  expenses: IExpense[];
  setExpenses: (expenses: IExpense[]) => void;
  expense: IExpense;
}

const Expense: React.FC<Props> = ({ expenses, expense, setExpenses }) => {
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

  return (
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
  );
};

export default Expense;
