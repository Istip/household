import { Avatar, Box, Button, Divider, Text } from '@chakra-ui/react';
import { useAuth } from '../../context/AuthContext';
import { Item as IItem } from '../../interfaces/Item';
import dayjs from 'dayjs';

interface IProps {
  item: IItem;
}
const Item: React.FC<IProps> = ({ item }) => {
  const { user } = useAuth();

  return (
    <Box
      p={5}
      border="1px solid"
      borderColor="gray.200"
      borderRadius={10}
      mb={2}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box fontWeight="bold" ml={1}>
          {item.name}
        </Box>
        <Box fontSize="sm" display="flex" gap={1}>
          <Button colorScheme="red" size="sm">
            <i className="fa-solid fa-trash"></i>
          </Button>
          <Button colorScheme="green" size="sm">
            <i className="fa-solid fa-circle-check"></i>
          </Button>
        </Box>
      </Box>
      <Box my={3}>
        <Divider />
      </Box>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Avatar name={user!.name} size="2xs" />

        <Box>
          <Text
            fontSize="xs"
            fontWeight="bold"
            color={item.completed ? 'green.400' : 'red.400'}
            mr={1}
          >
            {item.completed ? 'COMPLETED' : 'INCOMPLETE'}
          </Text>
        </Box>

        <Text fontSize="xs">
          <Text fontSize="xs" as="span" color="gray.400" mr={1}>
            <i className="fa-solid fa-clock"></i>
          </Text>
          <Text fontSize="xs" as="span" color="gray.400" mr={1}>
            {dayjs(item.createdAt).format('MMMM DD : HH:mm')}
          </Text>
        </Text>
      </Box>
    </Box>
  );
};

export default Item;
