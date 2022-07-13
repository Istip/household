import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);

  const login = () => {
    setUser(true);
    console.log('✅ Logged in!');
  };

  const logout = () => {
    setUser(false);
    console.log('❌ Logged out!');
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
