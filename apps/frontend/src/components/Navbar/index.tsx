import axios from 'axios';
import React from 'react';
import { Loader } from '../Loader';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const Navbar = () => {
  const { logout, token, user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const handleLogout = async () => {
    setLoading(true);
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
    <>
      {loading ? <Loader /> : null}
      <nav>
        <div className="nav-wrapper">
          <a onClick={() => navigate(-1)}>voltar</a>
          <span>Bem vindo, {user.name}</span>
          <ul className="right hide-on-med-and-down">
            <li>
              <a href="#!" onClick={handleLogout}>
                <span>Sair</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export { Navbar };
