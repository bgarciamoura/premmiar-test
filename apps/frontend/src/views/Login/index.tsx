import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Login = () => {
  const navigate = useNavigate();
  const { login, user } = useAuth();
  const [email, setEmail] = React.useState('teste@teste.com.br');
  const [password, setPassword] = React.useState('123456');

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Preencha todos os campos');
      return;
    }

    const response = await axios.post('http://localhost:3333/api/auth/login', {
      email,
      password,
    });

    const { token, userId } = response.data;

    await login(userId, token).then(() => {
      navigate('/');
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>{user}</h1>

        <div className="form-group">
          <label htmlFor="email">Email address</label>
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

        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
      <div>
        <button onClick={() => navigate('/register')}>Crie sua conta</button>
      </div>
    </>
  );
};

export { Login };
