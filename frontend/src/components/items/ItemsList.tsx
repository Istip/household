import { Box } from '@chakra-ui/react';
import { useItems } from '../../context/ItemContext';
import { Item } from '../';
import Loading from '../loading/Loading';

const ItemsList: React.FC = () => {
  const { items } = useItems();

  return (
    <Box mb="118px">
      {items.length === 0 && (
        <Box display="flex" justifyContent="center" alignItems="center" my={5}>
          <Loading />
        </Box>
      )}

      {items.map((item) => (
        <Item key={item._id} item={item} />
      ))}
    </Box>
  );
};

export default ItemsList;
