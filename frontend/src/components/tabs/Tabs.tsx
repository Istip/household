import {
  Badge,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs as TabsWrapper,
  Text,
} from '@chakra-ui/react';
import { ItemsList, NotesList, ExpenseList } from '../';
import { useItems } from '../../context/ItemContext';
import { useNotes } from '../../context/NotesContext';
import { Expense } from '../../interfaces/Expense';

interface Props {
  tabIndex: number;
  setTabIndex: (index: number) => void;
  expenses: Expense[];
  setExpenses: (expenses: Expense[]) => void;
}

const Tabs: React.FC<Props> = ({
  tabIndex,
  setTabIndex,
  expenses,
  setExpenses,
}) => {
  const { notes } = useNotes();
  const { items } = useItems();

  return (
    <TabsWrapper isFitted variant="enclosed-colored" index={tabIndex}>
      <TabList
        position="fixed"
        left={0}
        right={0}
        top="72px"
        zIndex={2}
        pb={1}
        mx={-1}
        background="white"
      >
        <Tab onClick={() => setTabIndex(0)}>
          <Text as="div" fontSize="sm" fontWeight="bold">
            Shopping
            <Badge as="div" borderRadius="full" ml={2}>
              {items.length}
            </Badge>
          </Text>
        </Tab>
        <Tab onClick={() => setTabIndex(1)}>
          <Text as="div" fontSize="sm" fontWeight="bold">
            Notes
            <Badge as="div" borderRadius={10} ml={2}>
              {notes.length}
            </Badge>
          </Text>
        </Tab>
        <Tab onClick={() => setTabIndex(2)}>
          <Text as="div" fontSize="sm" fontWeight="bold">
            Expenses
          </Text>
        </Tab>
      </TabList>

      <TabPanels mt="111px">
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
