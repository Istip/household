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
  error: string;
}

const AuthContext = createContext({} as IState);

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const register = (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    setLoading(true);
    setError('');

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
        setLoading(false);
      });
  };

  const login = async (data: { email: string; password: string }) => {
    setLoading(true);
    setError('');

    axios
      .post('/users/login', data)
      .then((res) => {
        localStorage.setItem('user', JSON.stringify(res.data));
        setUser(res.data);
        window.location.reload();
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
  };

  // dummy comment

  useEffect(() => {
    if (!user) {
      const authed = localStorage.getItem('user');
      const data = authed && JSON.parse(authed);
      setUser(data);
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, loading, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContextProvider;
