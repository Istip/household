import { useState } from "react";
import {
  Avatar,
  Box,
  Divider,
  Flex,
  ScaleFade,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useNotes } from "../../context/NotesContext";
import { Note as INote } from "../../interfaces/Note";
import { Comments } from "../";
import dayjs from "dayjs";

interface IProps {
  note: INote;
}

const Note: React.FC<IProps> = ({ note }) => {
  const [confirm, setConfirm] = useState(false);
  const { deleteNote, updateNote, loading } = useNotes();
  const { _id, text, createdAt, createdBy, marked } = note;
  const [isMarked, setIsMarked] = useState(marked);

  const { isOpen, onToggle } = useDisclosure();

  const toast = useToast();

  const deleteIcon = <i className="fa-solid fa-circle-xmark"></i>;
  const confirmIcon = <i className="fa-solid fa-circle-check"></i>;
  const bookmarkIcon = <i className="fa-solid fa-bookmark"></i>;
  const clockIcon = <i className="fa-solid fa-clock"></i>;

  const handleDelete = () => {
    toast({
      title: <Text fontSize="sm">Deleted: {note.text}</Text>,
      position: "top",
      isClosable: true,
      status: "success",
    });

    deleteNote(_id);
  };

  const handleMark = () => {
    const data = {
      ...note,
      marked: !isMarked,
    };
    updateNote(note._id, data);
    setIsMarked(!isMarked);
  };

  return (
    <Box
      p={5}
      borderRadius={12}
      mb={4}
      backgroundColor={marked ? "twitter.50" : "white"}
      boxShadow="lg"
      border="1px solid"
      borderColor={marked ? "twitter.400" : "gray.200"}
      position="relative"
    >
      <Flex justifyContent="space-between" alignItems="center">
        <Box display="flex" gap={3} alignItems="center">
          <Avatar name={createdBy} size="xs" fontWeight="bold" />
          <Box display="flex" gap={1}>
            <Text color="gray.400" fontSize="xs">
              {clockIcon}
            </Text>
            <Text color="gray.500" fontSize="xs">
              {dayjs(createdAt).format("MMMM DD HH:mm")}
            </Text>
          </Box>
        </Box>
        {!loading ? (
          <Box display="flex" gap={2}>
            <Text
              p={-1}
              mr={confirm ? 3 : 0}
              onClick={handleMark}
              color={isMarked ? "twitter.500" : "gray.600"}
            >
              {bookmarkIcon}
            </Text>
            <ScaleFade initialScale={0.1} in={isOpen}>
              {confirm && (
                <Text color="red.400" p={-1} onClick={handleDelete}>
                  {confirmIcon}
                </Text>
              )}
            </ScaleFade>
            <Text
              color={confirm ? "gray.600" : "red.400"}
              p={-1}
              onClick={() => {
                onToggle();
                setConfirm(!confirm);
              }}
            >
              {deleteIcon}
            </Text>
          </Box>
        ) : null}
      </Flex>

      <Divider my={4} />
      <Text fontWeight="bold">{text}</Text>
      <Divider my={4} />
      <Comments note={note} marked={marked} />
    </Box>
  );
};

export default Note;
