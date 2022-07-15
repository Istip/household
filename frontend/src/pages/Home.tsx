import { useState } from 'react';
import { Footer, Navbar, Tabs } from '../components';
import ItemProvider from '../context/ItemContext';

const Home: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <>
      <Navbar />
      <ItemProvider>
        <Tabs tabIndex={tabIndex} setTabIndex={setTabIndex} />
        <Footer tabIndex={tabIndex} />
      </ItemProvider>
    </>
  );
};

export default Home;
