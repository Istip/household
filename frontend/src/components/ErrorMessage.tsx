import { Alert, AlertIcon, AlertTitle } from '@chakra-ui/react';

const ErrorMessage: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Alert status="error" variant="left-accent">
      <AlertIcon />
      <AlertTitle>{children}</AlertTitle>
    </Alert>
  );
};

export default ErrorMessage;
