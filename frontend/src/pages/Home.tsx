import { useState } from 'react';
import { Footer, Navbar, Tabs } from '../components';

const Home: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <>
      <Navbar />
      <Tabs tabIndex={tabIndex} setTabIndex={setTabIndex} />
      <Footer tabIndex={tabIndex} />
    </>
  );
};

export default Home;
