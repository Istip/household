import { createContext, useContext, useEffect, useState } from 'react';
import axios from '../helpers/axios';
import { Item } from '../interfaces/Item';

interface IState {
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[] | []>>;
  loading: boolean;
  error: string;
  updateItem: (id: string, data: object) => void;
  deleteItem: (id: string) => void;
  createItem: (data: NewItem) => void;
}

interface NewItem {
  name: string;
  createdBy: string;
}

const ItemContext = createContext({} as IState);

export const ItemProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<Item[] | []>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchItems = () => {
    axios.get('/items').then((res) => {
      setItems(res.data);
    });
  };

  const updateItem = (id: string, data: object) => {
    setLoading(true);
    setError('');

    axios
      .put(`/items/${id}`, data)
      .then((res) => {
        setItems((prevItems) => {
          return prevItems.map((item) => {
            if (item._id === id) {
              return { ...item, ...data };
            }
            return item;
          });
        });
      })
      .catch((err) => {
        setError(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const createItem = (data: NewItem) => {
    setLoading(true);
    setError('');

    axios
      .post('/items', data)
      .then((res) => {
        setItems((prevItems) => [res.data, ...prevItems]);
      })
      .catch((err) => {
        setError(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
        console.log(items);
      });
  };

  const deleteItem = (id: string) => {
    setLoading(true);
    setError('');

    axios
      .delete(`/items/${id}`)
      .then((res) => {
        setItems((prevItems) => {
          return prevItems.filter((item) => item._id !== id);
        });
      })
      .catch((err) => {
        setError(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    return fetchItems();
    // eslint-disable-next-line
  }, []);

  return (
    <ItemContext.Provider
      value={{
        items,
        setItems,
        loading,
        error,
        updateItem,
        deleteItem,
        createItem,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
};

export const useItems = () => {
  return useContext(ItemContext);
};

export default ItemProvider;
