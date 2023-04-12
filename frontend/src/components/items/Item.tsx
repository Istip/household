import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useItems } from "../../context/ItemContext";
import { Item as IItem } from "../../interfaces/Item";
import dayjs from "dayjs";

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
      position: "top",
      isClosable: true,
      status: "success",
    });

    deleteItem(_id);
  };

  const handleUpdate = (name: string) => {
    if (text !== item.name && text !== "") {
      const data = {
        name,
      };
      updateItem(_id, data);
    }

    if (text === "") {
      handleDelete();
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const trashIcon = <i className="fa-solid fa-trash-can"></i>;
  const checkIcon = <i className="fa-solid fa-circle-check"></i>;
  const editIcon = <i className="fa-solid fa-square-pen"></i>;

  return (
    <Box
      p={5}
      pb={3}
      border="1px solid"
      borderRadius={12}
      mb={4}
      borderColor={completed ? "white" : "gray.200"}
      opacity={completed ? "0.4" : "1"}
      backgroundColor={completed ? "white" : "gray.50"}
      boxShadow="lg"
      position="relative"
    >
      <Flex
        position="absolute"
        top="5px"
        left="5px"
        alignItems="center"
        gap={1}
      >
        <Avatar name={createdBy} size="xs" fontWeight="bold" />
        <Box fontWeight="bold" fontSize="xs" color="gray.400">
          {createdBy}
        </Box>
      </Flex>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        pl={3}
      >
        <Editable
          fontWeight="bold"
          defaultValue={name}
          onSubmit={() => handleUpdate(text)}
          selectAllOnFocus={false}
          mt={1}
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
            {trashIcon}
          </Button>
          <Button
            colorScheme="green"
            size="sm"
            onClick={handleComplete}
            isLoading={loading}
          >
            {checkIcon}
          </Button>
        </Box>
      </Box>
      <Box my={3}>
        <Divider />
      </Box>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          {createdAt !== updatedAt && (
            <Text fontSize="xs" fontWeight="light" color="blue.300">
              {editIcon} {dayjs(updatedAt).format("MMM DD, HH:mm")}
            </Text>
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
            {editIcon}
          </Text>

          <Text
            alignSelf="center"
            fontSize="xs"
            as="span"
            color="gray.400"
            mr={2}
          >
            {dayjs(createdAt).format("MMM DD, HH:mm")}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Item;
