import { Avatar, Box, Button, Text } from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { logout, user } = useAuth();
  return (
    <Box
      p={5}
      justifyContent="space-between"
      alignItems="center"
      display="flex"
      background="gray.50"
    >
      <Box>
        <Text fontSize="md" color="blue.600" fontWeight="black">
          HOUSEHOLD
        </Text>
      </Box>

      <Box alignItems="center" display="flex" gap="2">
        <Box>
          <Button size="sm" onClick={logout}>
            Logout
          </Button>
        </Box>
        <Box>
          <Avatar size="sm" name={user!.name} />
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
