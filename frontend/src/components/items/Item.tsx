import {
  Avatar,
  Box,
  Button,
  Divider,
  Editable,
  EditableInput,
  EditablePreview,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useItems } from '../../context/ItemContext';
import { Item as IItem } from '../../interfaces/Item';
import dayjs from 'dayjs';
import { useState } from 'react';

interface IProps {
  item: IItem;
}
const Item: React.FC<IProps> = ({ item }) => {
  const [text, setText] = useState(item.name);

  const { updateItem, deleteItem, loading } = useItems();
  const { completed, _id, name, createdAt, createdBy } = item;

  const toast = useToast();

  const handleComplete = () => {
    const data = {
      completed: !completed,
    };
    updateItem(_id, data);
  };

  const handleDelete = () => {
    toast({
      title: <Text fontSize="sm">Deleted: {name}</Text>,
      position: 'top',
      isClosable: true,
      status: 'error',
    });

    deleteItem(_id);
  };

  const handleUpdate = (name: string) => {
    if (text !== item.name && text !== '') {
      const data = {
        name,
      };
      updateItem(_id, data);
    }

    if (text === '') {
      handleDelete();
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
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
        <Editable
          fontWeight="bold"
          defaultValue={name}
          onSubmit={() => handleUpdate(text)}
          selectAllOnFocus={false}
        >
          <EditablePreview />
          <EditableInput value={text} onChange={onChange} background="white" />
        </Editable>

        <Box fontSize="sm" display="flex" gap={1} ml={2}>
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
      <Box display="flex" alignItems="center" justifyContent="flex-end">
        <Text
          alignSelf="center"
          fontSize="xs"
          as="span"
          color="gray.400"
          mr={1}
        >
          <i className="fa-solid fa-clock"></i>
        </Text>

        <Text
          alignSelf="center"
          fontSize="xs"
          as="span"
          color="gray.400"
          mr={2}
        >
          {dayjs(createdAt).format('MMMM DD - HH:mm')}
        </Text>
        <Avatar name={createdBy} size="2xs" fontWeight="bold" />
      </Box>
    </Box>
  );
};

export default Item;
