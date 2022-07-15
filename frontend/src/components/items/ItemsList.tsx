import { Box } from '@chakra-ui/react';
import { useItems } from '../../context/ItemContext';
import { Item } from '../';

const ItemsList: React.FC = () => {
  const { items } = useItems();

  return (
    <Box mb="60px">
      {items.map((item) => (
        <Item key={item._id} item={item} />
      ))}
    </Box>
  );
};

export default ItemsList;
