import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs as TabsWrapper,
  Text,
} from '@chakra-ui/react';
import { ItemsList } from '../';

interface Props {
  tabIndex: number;
  setTabIndex: (index: number) => void;
}

const Tabs: React.FC<Props> = ({ tabIndex, setTabIndex }) => {
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
          <Text fontSize="sm" fontWeight="bold">
            SHOPPING
          </Text>
        </Tab>
        <Tab onClick={() => setTabIndex(1)}>
          <Text fontSize="sm" fontWeight="bold">
            NOTES
          </Text>
        </Tab>
      </TabList>

      <TabPanels mt="111px">
        <TabPanel>
          <ItemsList />
        </TabPanel>
        <TabPanel>
          <Text fontSize="xl" fontWeight="bold">
            Notes goes here
          </Text>
        </TabPanel>
      </TabPanels>
    </TabsWrapper>
  );
};

export default Tabs;
