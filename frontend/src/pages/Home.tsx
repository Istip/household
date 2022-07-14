import { Button, Flex, Text } from '@chakra-ui/react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from '@chakra-ui/react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Home: React.FC = () => {
  const { user, logout } = useAuth();

  const getMe = () => {
    const config = {
      headers: { Authorization: `Bearer ${user.token}` },
    };

    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/users/me`, config)
      .then((res) => {
        console.log(res.data);
      });
  };

  return (
    <Flex alignItems="center" justify="center" flexDirection="column" h="100vh">
      <Text fontSize="5xl">Hi!</Text>
      <Text fontSize="md">If you see this, that means you are logged in!</Text>

      <br />

      <Button onClick={logout}>Logout</Button>

      <br />

      <Button colorScheme="red" onClick={getMe}>
        Get profile endpoint
      </Button>

      <br />

      <Popover>
        <PopoverTrigger>
          <Button colorScheme="blue">Show User Data</Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            <Text size="sm">
              <b>Name: </b>
              {user.name}
            </Text>
            <Text size="sm">
              <b>Email: </b>
              {user.email}
            </Text>
            <Text size="sm">
              <b>ID: </b>
              {user._id}
            </Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  );
};

export default Home;
