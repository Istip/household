import { Avatar, Box, Button, Divider, Text } from '@chakra-ui/react';
import { useItems } from '../../context/ItemContext';
import { Item as IItem } from '../../interfaces/Item';
import dayjs from 'dayjs';

interface IProps {
  item: IItem;
}
const Item: React.FC<IProps> = ({ item }) => {
  const { updateItem, deleteItem, loading } = useItems();
  const { completed, _id, name, createdAt, createdBy } = item;

  const handleComplete = () => {
    const data = {
      completed: !completed,
    };
    updateItem(_id, data);
  };

  const handleDelete = () => {
    deleteItem(_id);
  };

  return (
    <Box
      p={5}
      border="1px solid"
      borderRadius={10}
      mb={2}
      borderColor={completed ? 'gray.300' : 'gray.400'}
      opacity={completed ? '0.5' : '1'}
      backgroundColor={completed ? 'white' : 'gray.50'}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box fontWeight="bold" ml={1}>
          {name}
        </Box>
        <Box fontSize="sm" display="flex" gap={1}>
          <Button
            colorScheme="red"
            size="sm"
            onClick={handleDelete}
            isLoading={loading}
          >
            <i className="fa-solid fa-trash"></i>
          </Button>
          <Button
            colorScheme="green"
            size="sm"
            onClick={handleComplete}
            isLoading={loading}
          >
            <i className="fa-solid fa-circle-check"></i>
          </Button>
        </Box>
      </Box>
      <Box my={3}>
        <Divider />
      </Box>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Avatar name={createdBy} size="2xs" />

        <Text fontSize="xs">
          <Text fontSize="xs" as="span" color="gray.400" mr={1}>
            <i className="fa-solid fa-clock"></i>
          </Text>
          <Text fontSize="xs" as="span" color="gray.400" mr={1}>
            {dayjs(createdAt).format('MMMM DD - HH:mm')}
          </Text>
        </Text>
      </Box>
    </Box>
  );
};

export default Item;
