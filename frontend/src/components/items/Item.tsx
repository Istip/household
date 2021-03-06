import { useState } from 'react';
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

interface IProps {
  item: IItem;
}

const Item: React.FC<IProps> = ({ item }) => {
  const [text, setText] = useState(item.name);

  const { updateItem, deleteItem, loading } = useItems();
  const { completed, _id, name, createdAt, createdBy, updatedAt } = item;

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
      pb={3}
      border="1px solid"
      borderRadius={10}
      mb={2}
      borderColor={completed ? 'white' : 'gray.200'}
      opacity={completed ? '0.4' : '1'}
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
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          {createdAt !== updatedAt ? (
            <Text fontSize="xs" fontWeight="light" color="telegram.300">
              <i className="fa-solid fa-square-pen"></i>{' '}
              {dayjs(updatedAt).format('MMM DD, HH:mm')}
            </Text>
          ) : (
            ''
          )}
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
            {dayjs(createdAt).format('MMM DD, HH:mm')}
          </Text>
          <Avatar name={createdBy} size="2xs" fontWeight="bold" />
        </Box>
      </Box>
    </Box>
  );
};

export default Item;
