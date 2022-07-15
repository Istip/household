import { Alert, AlertIcon, AlertTitle } from '@chakra-ui/react';

const ErrorMessage: React.FC<{ children: React.ReactNode }> = ({
  children,
  ...props
}) => {
  return (
    <Alert status="error" variant="left-accent" {...props}>
      <AlertIcon />
      <AlertTitle>{children}</AlertTitle>
    </Alert>
  );
};

export default ErrorMessage;
