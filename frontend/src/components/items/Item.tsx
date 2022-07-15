import { Avatar, Box, Button, Divider, Text } from '@chakra-ui/react';
import { useAuth } from '../../context/AuthContext';
import { useItems } from '../../context/ItemContext';
import { Item as IItem } from '../../interfaces/Item';
import dayjs from 'dayjs';
import ErrorMessage from '../ErrorMessage';

interface IProps {
  item: IItem;
}
const Item: React.FC<IProps> = ({ item }) => {
  const { completeItem, deleteItem, loading, error } = useItems();
  const { user } = useAuth();
  const { completed, _id, name, createdAt } = item;

  const handleComplete = () => {
    const data = {
      completed: !completed,
    };
    completeItem(_id, data);
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
        <Avatar name={user!.name} size="2xs" />

        <Text fontSize="xs">
          <Text fontSize="xs" as="span" color="gray.400" mr={1}>
            <i className="fa-solid fa-clock"></i>
          </Text>
          <Text fontSize="xs" as="span" color="gray.400" mr={1}>
            {dayjs(createdAt).format('MMMM DD - HH:mm')}
          </Text>
        </Text>
      </Box>

      {error && (
        <Box mt={2}>
          <ErrorMessage>{error}</ErrorMessage>
        </Box>
      )}
    </Box>
  );
};

export default Item;
