import React, { createContext, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorageHook';

interface AuthContextProps {
  user: any;
  token: string;
  login(email: string, password: string): Promise<boolean>;
  logout(): void;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  token: '',
  login: () => Promise.resolve(false),
  logout: () => {},
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('user', null);
  const [token, setToken] = useLocalStorage('token', null);

  const login = async (user: any, token: any) => {
    console.log('login', user, token);
    setUser(user);
    setToken(token);

    return true;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  const value = useMemo(
    () => ({
      user,
      token,
      login,
      logout,
    }),
    [user, token, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => React.useContext(AuthContext);

export { AuthContext, AuthProvider, useAuth };
