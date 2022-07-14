import { useState } from 'react';
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
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { register } = useAuth();

  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await register(data);

    navigate('/');
  };

  return (
    <Flex align="center" justify="center" h="100vh" flexDirection="column">
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
                    autoComplete="off"
                    name="name"
                    type="text"
                    id="name"
                    placeholder="Enter your name"
                    onChange={onChange}
                  />
                  <FormHelperText color="gray.300">
                    Even a short nickname will be enough!
                  </FormHelperText>
                </FormControl>
              </Box>

              <Box p={4}>
                <FormControl isRequired>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    autoComplete="off"
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
                    autoComplete="off"
                    name="password"
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    onChange={onChange}
                  />
                </FormControl>
              </Box>

              <Box w="100%" pt={8} px={4}>
                <Button colorScheme="gray" w="100%" type="submit">
                  Register
                </Button>
              </Box>

              <Box pt={4}>
                <Flex align="center" justify="center" color="blue.200">
                  <b>
                    <Link to="/login">Already registered member?</Link>
                  </b>
                </Flex>
              </Box>
            </form>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Register;
