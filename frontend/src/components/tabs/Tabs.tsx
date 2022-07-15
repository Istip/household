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
      <TabList mb="1em">
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

      <TabPanels>
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
