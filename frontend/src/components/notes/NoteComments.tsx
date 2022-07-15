import { Box, Button, Input } from '@chakra-ui/react';

const NoteComments: React.FC = () => {
  const createIcon = <i className="fa-solid fa-paper-plane"></i>;

  return (
    <form>
      <Box display="flex" gap={2}>
        <Input background="white" size="xs" placeholder="Leave a comment..." />
        <Button leftIcon={createIcon} size="xs" px={3}>
          Send
        </Button>
      </Box>
    </form>
  );
};

export default NoteComments;
