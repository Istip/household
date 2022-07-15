import { useState } from 'react';
import { Footer, Navbar, Tabs } from '../components';
import ItemProvider from '../context/ItemContext';
import NoteProvider from '../context/NotesContext';

const Home: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(1);

  return (
    <>
      <Navbar />
      <ItemProvider>
        <NoteProvider>
          <Tabs tabIndex={tabIndex} setTabIndex={setTabIndex} />
          <Footer tabIndex={tabIndex} />
        </NoteProvider>
      </ItemProvider>
    </>
  );
};

export default Home;
