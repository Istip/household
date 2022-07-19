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

  const selected = { color: 'white', bg: 'blue.300' };

  return (
    <TabsWrapper isFitted variant="unstyled" index={tabIndex}>
      <TabList
        borderTop="1px solid"
        borderColor="blue.300"
        position="fixed"
        left={0}
        right={0}
        bottom={0}
        zIndex={2}
        background="white"
        h="60px"
      >
        <Tab _selected={selected} onClick={() => setTabIndex(0)}>
          <Text as="div" fontSize="sm" fontWeight="bold">
            Shop
            {items.length ? (
              <Badge
                fontSize="9px"
                borderRadius="full"
                colorScheme="blue"
                ml={2}
              >
                {items.length}
              </Badge>
            ) : null}
          </Text>
        </Tab>
        <Tab _selected={selected} onClick={() => setTabIndex(1)}>
          <Text as="div" fontSize="sm" fontWeight="bold">
            Notes
            {notes.length ? (
              <Badge
                fontSize="9px"
                borderRadius="full"
                colorScheme="blue"
                ml={2}
              >
                {notes.length}
              </Badge>
            ) : null}
          </Text>
        </Tab>
        <Tab _selected={selected} onClick={() => setTabIndex(2)}>
          <Text as="div" fontSize="sm" fontWeight="bold">
            Expenses
          </Text>
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
