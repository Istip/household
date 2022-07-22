import { Box, Text } from '@chakra-ui/react';
import { IExpense } from '../../interfaces/Expense';

interface Props {
  expenses: IExpense[];
}

const ExpenseTotal: React.FC<Props> = ({ expenses }) => {
  const totalExpenses =
    expenses.length &&
    expenses.reduce((acc, curr) => {
      return acc + curr.amount;
    }, 0);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      background={totalExpenses <= 0 ? 'red.100' : 'green.100'}
      borderRadius="10px"
      p={5}
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
  );
};

export default ExpenseTotal;
