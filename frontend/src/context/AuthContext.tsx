import { createContext, useContext, useEffect, useState } from 'react';
import axios from '../helpers/axios';

interface IState {
  user: {
    _id: string;
    name: string;
    email: string;
    token: string;
    image?: string;
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
      .then((res) => {
        localStorage.setItem('user', JSON.stringify(res.data));
        setUser(res.data);
      })
      .catch((err) => {
        setError(err.response.data.message);
      })
      .finally(() => {
        setAuthReady(true);
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
        localStorage.setItem('user', JSON.stringify(res.data));
        setUser(res.data);
      })
      .catch((err) => {
        setError(err.response.data.message);
      })
      .finally(() => {
        setAuthReady(true);
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
    const data = authed && JSON.parse(authed);
    setUser(data);

    console.log(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
