import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import Footer from '../components/Footer';
import ItemsList from '../components/items/ItemsList';
import Navbar from '../components/Navbar';
import ItemProvider from '../context/ItemContext';

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <Tabs isFitted variant="enclosed-colored">
        <TabList mb="1em">
          <Tab>
            <Text fontSize="sm" fontWeight="bold">
              SHOPPING
            </Text>
          </Tab>
          <Tab>
            <Text fontSize="sm" fontWeight="bold">
              NOTES
            </Text>
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <ItemProvider>
              <ItemsList />
            </ItemProvider>
          </TabPanel>
          <TabPanel>
            <Text fontSize="xl" fontWeight="bold">
              Notes goes here
            </Text>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Footer />
    </>
  );
};

export default Home;
