import { Footer, Navbar, Tabs } from '../components';
import ItemProvider from '../context/ItemContext';
import NoteProvider from '../context/NotesContext';
import useLocalStorage from '../hooks/useLocalStorage';

const Home: React.FC = () => {
  const [tabIndex, setTabIndex] = useLocalStorage('household-tab-index', 0);

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
