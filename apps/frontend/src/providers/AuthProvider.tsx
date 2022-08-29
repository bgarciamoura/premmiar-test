import React, { createContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorageHook';

interface AuthContextProps {
  user: string;
  token: string;
  login(email: string, password: string): Promise<boolean>;
  logout(): void;
}

const AuthContext = createContext<AuthContextProps>({
  user: '',
  token: '',
  login: () => Promise.resolve(false),
  logout: () => {},
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('user', null);
  const [token, setToken] = useLocalStorage('token', null);

  const login = async (user: string, token: any) => {
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

export { AuthProvider, AuthContext };
