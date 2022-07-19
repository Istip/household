import { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftAddon,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { useItems } from '../../context/ItemContext';
import { Item as IItem } from '../../interfaces/Item';
import { Item } from '../';

const ItemsList: React.FC = () => {
  const { items, loading } = useItems();

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

  if (loading) {
    return (
      <Flex justifyContent="center" p={5}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Flex>
    );
  }

  return (
    <Box mb="110px">
      {items.length !== 0 && (
        <InputGroup mb={2}>
          <InputLeftAddon children={searchIcon} />
          <Input
            type="text"
            value={searchText}
            onChange={onChange}
            placeholder="Enter text to search items.."
          />
        </InputGroup>
      )}

      {filteredItems.length === 0 && (
        <Box display="flex" justifyContent="center" alignItems="center" my={5}>
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
