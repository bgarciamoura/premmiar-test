import axios from 'axios';
import React from 'react';
import { useAuth } from '../../hooks/useAuth';

const Home: React.FC = () => {
  const { logout, token } = useAuth();

  const handleLogout = async () => {
    await axios.post(
      'http://localhost:3333/api/auth/logout',
      {},
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );

    logout();
  };

  return (
    <div>
      <h1>Home</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export { Home };
