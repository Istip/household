import { useState } from 'react';
import axios from 'axios';
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Button,
  Text,
  Box,
  Flex,
} from '@chakra-ui/react';

const Register: React.FC = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/users`, data);
  };

  return (
    <Box>
      <Flex align="center" justify="center">
        <Text fontSize="4xl">Register</Text>
      </Flex>
      <Box w="100%">
        <Flex align="center" justify="center">
          <Box w={500}>
            <form onSubmit={onSubmit}>
              <Box p={4}>
                <FormControl isRequired>
                  <FormLabel htmlFor="name">First name</FormLabel>
                  <Input
                    name="name"
                    type="text"
                    id="name"
                    placeholder="Enter your name"
                    onChange={onChange}
                  />
                  <FormHelperText>
                    Even a short nickname will be enough!
                  </FormHelperText>
                </FormControl>
              </Box>

              <Box p={4}>
                <FormControl isRequired>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    name="email"
                    type="email"
                    id="email"
                    placeholder="Enter your email address"
                    onChange={onChange}
                  />
                </FormControl>
              </Box>

              <Box px={4}>
                <FormControl isRequired>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input
                    name="password"
                    type="password"
                    id="password"
                    placeholder="First name"
                    onChange={onChange}
                  />
                </FormControl>
              </Box>

              <Box w="100%" pt={8} px={4}>
                <Button colorScheme="gray" w="100%" type="submit">
                  Register
                </Button>
              </Box>
            </form>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Register;
