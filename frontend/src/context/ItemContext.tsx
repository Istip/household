import { createContext, useContext, useEffect, useState } from 'react';
import axios from '../helpers/axios';
import { Item } from '../interfaces/Item';

interface IState {
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[] | []>>;
}

const ItemContext = createContext({} as IState);

export const ItemProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<Item[] | []>([]);

  const fetchItems = () => {
    axios.get('/items').then((res) => {
      setItems(res.data);
    });
  };

  useEffect(() => {
    return fetchItems();
    // eslint-disable-next-line
  }, [items.length]);

  return (
    <ItemContext.Provider value={{ items, setItems }}>
      {children}
    </ItemContext.Provider>
  );
};

export const useItems = () => {
  return useContext(ItemContext);
};

export default ItemProvider;
