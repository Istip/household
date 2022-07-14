import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface User {
  _id: string;
  name: string;
  email: string;
  token: string;
}

interface IProps {
  children: React.ReactNode;
}

const AuthContext = createContext<any>(null);

export const AuthContextProvider: React.FC<IProps> = ({ children }) => {
  const [user, setUser] = useState<User | string | null>(null);
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
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/users`, data)
      .then((res) => {
        const user = res.data;

        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
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
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/users/login`, data)
      .then((res) => {
        const user = res.data;

        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
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
      value={{ user, loading, error, login, logout, register, authReady }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const user = useContext(AuthContext);

  if (!user) {
    throw new Error('useAuth must be used within a AuthContextProvider');
  }

  return user;
};

export default AuthContextProvider;
