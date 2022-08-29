import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Loader } from '../../components/Loader';
import './styles.css';

const Login = () => {
  const navigate = useNavigate();
  const { login, user } = useAuth();
  const [email, setEmail] = React.useState('bgarciamoura@gmail.com');
  const [password, setPassword] = React.useState('123456');
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      alert('Preencha todos os campos');
      setLoading(false);
      return;
    }

    try {
      const user = { email, password };
      axios
        .post('http://localhost:3333/api/auth/login', user)
        .then((response) => {
          if (response.status === 200) {
            const { token, userId, name } = response.data;

            login({ userId, name }, token).then(() => {
              navigate('/');
            });
          }
        })
        .catch((error) => {
          alert('Erro ao fazer login, verifique os dados e tente novamente');
          console.log(error);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);

      setLoading(false);
    }
  };

  return (
    <div className="main">
      {loading ? <Loader /> : null}
      <div className="card-background"></div>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <h1 className="card-title">Login</h1>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Insira seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-submit">
            Login
          </button>
          <div className="register-field">
            Ainda não tem conta?
            <a onClick={() => navigate('/register')}>Crie uma aqui</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export { Login };
