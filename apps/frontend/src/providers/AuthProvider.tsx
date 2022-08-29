import React, { createContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { IUser } from '../interfaces/IUser';

interface AuthContextProps {
  user: IUser;
  token: string;
  login(user: IUser, token: string): Promise<boolean>;
  logout(): void;
}

const AuthContext = createContext<AuthContextProps>({
  user: {
    userId: '',
    name: '',
  },
  token: '',
  login: () => Promise.resolve(false),
  logout: () => {},
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('user', null);
  const [token, setToken] = useLocalStorage('token', null);

  const login = async (user: IUser, token: any) => {
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
