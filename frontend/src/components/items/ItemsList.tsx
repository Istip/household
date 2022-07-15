import { Box, Text } from '@chakra-ui/react';
import { useItems } from '../../context/ItemContext';
import { Item } from '../';

const ItemsList: React.FC = () => {
  const { items } = useItems();

  return (
    <Box mb="60px">
      {items.length === 0 && (
        <Box display="flex" justifyContent="center" alignItems="center">
          <Text fontSize="xl" fontWeight="bold" color="gray.400">
            No items on the shopping list...
          </Text>
        </Box>
      )}

      {items.map((item) => (
        <Item key={item._id} item={item} />
      ))}
    </Box>
  );
};

export default ItemsList;
