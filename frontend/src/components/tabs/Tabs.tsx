import {
  Badge,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs as TabsWrapper,
  Text,
} from '@chakra-ui/react';
import { ItemsList, NotesList } from '../';
import { useItems } from '../../context/ItemContext';
import { useNotes } from '../../context/NotesContext';

interface Props {
  tabIndex: number;
  setTabIndex: (index: number) => void;
}

const Tabs: React.FC<Props> = ({ tabIndex, setTabIndex }) => {
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
            SHOPPING
            <Badge as="div" borderRadius="full" ml={2}>
              {items.length}
            </Badge>
          </Text>
        </Tab>
        <Tab onClick={() => setTabIndex(1)}>
          <Text as="div" fontSize="sm" fontWeight="bold">
            NOTES
            <Badge as="div" borderRadius={10} ml={2}>
              {notes.length}
            </Badge>
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
      </TabPanels>
    </TabsWrapper>
  );
};

export default Tabs;
