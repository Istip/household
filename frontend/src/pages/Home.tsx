import { useState } from 'react';
import { Footer, Navbar, Tabs } from '../components';
import ItemProvider from '../context/ItemContext';
import NoteProvider from '../context/NotesContext';
import useLocalStorage from '../hooks/useLocalStorage';
import { Expense } from '../interfaces/Expense';

const Home: React.FC = () => {
  const [tabIndex, setTabIndex] = useLocalStorage('household-tab-index', 0);

  const [expenses, setExpenses] = useState<Expense[]>([]);

  return (
    <>
      <Navbar />
      <ItemProvider>
        <NoteProvider>
          <Tabs
            tabIndex={tabIndex}
            setTabIndex={setTabIndex}
            expenses={expenses}
            setExpenses={setExpenses}
          />
          <Footer
            tabIndex={tabIndex}
            expenses={expenses}
            setExpenses={setExpenses}
          />
        </NoteProvider>
      </ItemProvider>
    </>
  );
};

export default Home;
