import {
  Badge,
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs as TabsWrapper,
} from '@chakra-ui/react';
import { ItemsList, NotesList, ExpenseList } from '../';
import { useItems } from '../../context/ItemContext';
import { useNotes } from '../../context/NotesContext';
import { IExpense } from '../../interfaces/Expense';

interface Props {
  tabIndex: number;
  setTabIndex: (index: number) => void;
  expenses: IExpense[];
  setExpenses: (expenses: IExpense[]) => void;
}

const Tabs: React.FC<Props> = ({
  tabIndex,
  setTabIndex,
  expenses,
  setExpenses,
}) => {
  const { notes } = useNotes();
  const { items } = useItems();

  const selected = {
    color: 'white',
    bg: 'blue.300',
  };

  return (
    <TabsWrapper isFitted variant="unstyled" index={tabIndex}>
      <TabList
        borderTop="1px solid"
        borderColor="gray.100"
        position="fixed"
        left={0}
        right={0}
        bottom={0}
        zIndex={2}
        background="white"
        h="60px"
      >
        <Tab _selected={selected} onClick={() => setTabIndex(0)}>
          <Box fontSize="sm" fontWeight="bold" position="relative">
            <i className="fa-solid fa-lg fa-cart-shopping"></i>
            {items.length && (
              <Badge
                position="absolute"
                right="calc(50% - 16px)"
                top="-6px"
                fontSize="8px"
                borderRadius="full"
                colorScheme="red"
                variant="solid"
                ml={2}
              >
                {items.length}
              </Badge>
            )}
          </Box>
        </Tab>
        <Tab _selected={selected} onClick={() => setTabIndex(1)}>
          <Box fontSize="sm" fontWeight="bold" position="relative">
            <i className="fa-solid fa-lg fa-comment"></i>

            {notes.length && (
              <Badge
                position="absolute"
                right="calc(50% - 16px)"
                top="-6px"
                fontSize="9px"
                borderRadius="full"
                colorScheme="red"
                variant="solid"
                ml={2}
              >
                {notes.length}
              </Badge>
            )}
          </Box>
        </Tab>
        <Tab _selected={selected} onClick={() => setTabIndex(2)}>
          <Box as="div" fontSize="sm" fontWeight="bold">
            <i className="fa-solid fa-lg fa-money-bill-wave"></i>
          </Box>
        </Tab>
      </TabList>

      <TabPanels mt="72px">
        <TabPanel>
          <ItemsList />
        </TabPanel>
        <TabPanel bg="gray.100" minH="calc(100vh - 111px)">
          <NotesList />
        </TabPanel>
        <TabPanel>
          <ExpenseList expenses={expenses} setExpenses={setExpenses} />
        </TabPanel>
      </TabPanels>
    </TabsWrapper>
  );
};

export default Tabs;
