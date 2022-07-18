import { createContext, useContext, useEffect, useState } from 'react';
import axios from '../helpers/axios';

interface IState {
  user: {
    _id: string;
    name: string;
    email: string;
    token: string;
  } | null;
  login: (data: { email: string; password: string }) => void;
  register: (data: { name: string; email: string; password: string }) => void;
  logout: () => void;
  loading: boolean;
  authReady: boolean;
  error: string;
}

const AuthContext = createContext({} as IState);

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [authReady, setAuthReady] = useState(false);

  const register = (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    setLoading(true);
    setError('');
    setAuthReady(false);

    axios
      .post('/users', data)
      .then(async (res) => {
        const response = await res.data;

        localStorage.setItem('user', JSON.stringify(response));
        setUser(response);
        setAuthReady(true);
      })
      .catch((err) => {
        setError(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const login = (data: { email: string; password: string }) => {
    setLoading(true);
    setError('');
    setAuthReady(false);

    axios
      .post('/users/login', data)
      .then((res) => {
        const response = res.data;

        localStorage.setItem('user', JSON.stringify(response));
        setUser(response);
        setAuthReady(true);
      })
      .catch((err) => {
        setError(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setAuthReady(false);
  };

  useEffect(() => {
    const authed = localStorage.getItem('user');

    if (!user && typeof authed === 'string') {
      const data = JSON.parse(authed);
      setUser(data);
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, loading, authReady, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContextProvider;
