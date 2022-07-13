import { createContext, useContext, useState } from 'react';

export const AuthContext = createContext(null);

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState('sziasztok');

  const login = () => {
    setUser(true);
  };

  const logout = () => {
    setUser(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {props.children}
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
