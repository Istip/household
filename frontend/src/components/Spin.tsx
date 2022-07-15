import { Box, Spinner } from '@chakra-ui/react';

const Spin: React.FC = () => {
  return (
    <Box position="fixed" top="50%" right="45%">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="gray.500"
        size="xl"
      />
    </Box>
  );
};

export default Spin;
