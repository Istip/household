import { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Flex,
  InputRightElement,
  InputGroup,
} from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const [show, setShow] = useState(false);

  const { login } = useAuth();

  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(data);

    navigate('/');
  };

  return (
    <Flex align="center" justify="center" h="100vh" flexDirection="column">
      <Flex align="center" justify="center">
        <Text fontSize="4xl">Login</Text>
      </Flex>
      <Box w="100%">
        <Flex align="center" justify="center">
          <Box w={500}>
            <form onSubmit={onSubmit}>
              <Box p={4}>
                <FormControl isRequired>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    autoComplete="on"
                    name="email"
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    onChange={onChange}
                  />
                </FormControl>
              </Box>

              <Box px={4}>
                <FormControl isRequired>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <InputGroup>
                    <Input
                      autoComplete="on"
                      name="password"
                      type={show ? 'text' : 'password'}
                      id="password"
                      placeholder="Enter your password"
                      onChange={onChange}
                    />
                    <InputRightElement width="4.5rem">
                      <Button
                        h="1.75rem"
                        size="sm"
                        onClick={() => setShow(!show)}
                      >
                        {show ? 'Hide' : 'Show'}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
              </Box>

              <Box w="100%" pt={8} px={4}>
                <Button colorScheme="gray" w="100%" type="submit">
                  Login
                </Button>
              </Box>

              <Box pt={4}>
                <Flex align="center" justify="center" color="blue.200">
                  <b>
                    <Link to="/register">You don't have account yet?</Link>
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
