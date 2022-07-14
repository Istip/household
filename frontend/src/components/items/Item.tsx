import { Box, Button, Flex } from '@chakra-ui/react';
import { Item as IItem } from '../../interfaces/Item';

interface IProps {
  item: IItem;
}
const Item: React.FC<IProps> = ({ item }) => {
  return (
    <Box
      p={5}
      border="1px solid"
      borderColor="gray.200"
      borderRadius={10}
      mb={2}
    >
      <Flex justifyContent="space-between" alignItems="center">
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
      </Flex>
    </Box>
  );
};

export default Item;
