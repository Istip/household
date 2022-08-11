import { useEffect, useState } from 'react';
import { Box, Input, InputGroup, InputLeftAddon } from '@chakra-ui/react';
import { useItems } from '../../context/ItemContext';
import { Item as IItem } from '../../interfaces/Item';
import { Item } from '../';
import Loading from '../loading/Loading';

const ItemsList: React.FC = () => {
  const { items } = useItems();

  const [searchText, setSearchText] = useState('');
  const [filteredItems, setFilteredItems] = useState<IItem[]>(items);

  const searchIcon = <i className="fa-solid fa-magnifying-glass"></i>;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    setFilteredItems(items);
  }, [items]);

  useEffect(() => {
    const newItem = items.filter((item) => {
      if (!searchText) return true;
      if (item.name.toLowerCase().includes(searchText.toLowerCase())) {
        return true;
      }
      return null;
    });

    setFilteredItems(newItem);
    // eslint-disable-next-line
  }, [searchText]);

  return (
    <Box mb="118px">
      {items.length !== 0 && (
        <InputGroup mb={4} size="sm">
          <InputLeftAddon children={searchIcon} borderRadius="6px" />
          <Input
            borderRadius="6px"
            type="text"
            value={searchText}
            onChange={onChange}
            placeholder="Enter text to search items.."
          />
        </InputGroup>
      )}

      {filteredItems.length === 0 && (
        <Box display="flex" justifyContent="center" alignItems="center" my={5}>
          <Loading />
        </Box>
      )}

      {filteredItems.map((item) => (
        <Item key={item._id} item={item} />
      ))}
    </Box>
  );
};

export default ItemsList;
