import { useEffect, useState } from 'react';
import { Box, Input, InputGroup, InputLeftAddon, Text } from '@chakra-ui/react';
import { useItems } from '../../context/ItemContext';
import { Item as IItem } from '../../interfaces/Item';
import { Item } from '../';

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
    <Box mb="60px">
      <InputGroup mb={2}>
        <InputLeftAddon children={searchIcon} />
        <Input
          type="text"
          value={searchText}
          onChange={onChange}
          placeholder="Enter text to search items.."
        />
      </InputGroup>

      {filteredItems.length === 0 && (
        <Box display="flex" justifyContent="center" alignItems="center">
          <Text fontSize="xl" fontWeight="bold" color="gray.400">
            No items found...
          </Text>
        </Box>
      )}

      {filteredItems.map((item) => (
        <Item key={item._id} item={item} />
      ))}
    </Box>
  );
};

export default ItemsList;
