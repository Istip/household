import { Badge, Box, Tab } from '@chakra-ui/react';
import { useItems } from '../../context/ItemContext';
import { useNotes } from '../../context/NotesContext';
import { IExpense } from '../../interfaces/Expense';

const TabIcons: React.FC<{
  setTabIndex: (index: number) => void;
  expenses: IExpense[];
}> = ({ setTabIndex, expenses }) => {
  interface tabItem {
    index: number;
    icon: JSX.Element;
    badge?: any;
  }

  const { notes } = useNotes();
  const { items } = useItems();

  const selected = {
    color: 'blue.300',
    bg: 'blue.50',
  };

  const totalExpenses =
    expenses.length &&
    expenses.reduce((acc, curr) => {
      return acc + curr.amount;
    }, 0);

  const tabContent: tabItem[] = [
    {
      index: 0,
      icon: <i className="fa-solid fa-lg fa-cart-shopping"></i>,
      badge: items.length,
    },
    {
      index: 1,
      icon: <i className="fa-solid fa-lg fa-comment"></i>,
      badge: notes.length,
    },
    {
      index: 2,
      icon: <i className="fa-solid fa-lg fa-money-bill-wave"></i>,
      badge: totalExpenses,
    },
  ];

  return (
    <>
      {tabContent.map((tab) => (
        <Tab
          key={tab.index}
          _selected={selected}
          onClick={() => setTabIndex(tab.index)}
        >
          <Box fontSize="sm" fontWeight="bold" position="relative">
            {tab.icon}
            {tab.badge ? (
              <Badge
                position="absolute"
                right="calc(50% - 16px)"
                top="-6px"
                fontSize="8px"
                borderRadius="full"
                colorScheme={tab.badge > 0 && tab.index === 2 ? 'green' : 'red'}
                variant="solid"
                ml={2}
              >
                {tab.badge}
              </Badge>
            ) : null}
          </Box>
        </Tab>
      ))}
    </>
  );
};

export default TabIcons;
