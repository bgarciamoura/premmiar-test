import React from 'react';
import { useAuth } from '../../hooks/useAuth';

const Home: React.FC = () => {
  const { logout } = useAuth();

  return (
    <div>
      <h1>Home</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export { Home };
