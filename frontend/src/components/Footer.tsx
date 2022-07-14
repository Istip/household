import { Box, Button, Input } from '@chakra-ui/react';

const Footer: React.FC = () => {
  return (
    <Box
      position="fixed"
      bottom={0}
      right={0}
      left={0}
      background="gray.50"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={2}
      borderTop="1px solid"
      borderColor="gray.200"
    >
      <Box>
        <Input placeholder="Enter item to buy" bg="white" />
      </Box>
      <Box>
        <Button colorScheme="blue">Create</Button>
      </Box>
    </Box>
  );
};

export default Footer;
