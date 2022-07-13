import { Button, Flex, Text } from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';

const Home: React.FC = () => {
  const { logout } = useAuth();

  return (
    <Flex alignItems="center" justify="center" flexDirection="column">
      <Text fontSize="5xl">Hi!</Text>
      <Text fontSize="md">If you see this, that means you are logged in!</Text>

      <br />

      <Button onClick={logout}>Logout</Button>
    </Flex>
  );
};

export default Home;
