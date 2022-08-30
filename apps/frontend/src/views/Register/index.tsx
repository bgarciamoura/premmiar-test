import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import { useAuth } from '../../hooks/useAuth';
import './styles.css';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = React.useState('Bruno');
  const [email, setEmail] = React.useState('bgarciamoura@gmail.com');
  const [password, setPassword] = React.useState('123456');
  const [passwordConfirmation, setPasswordConfirmation] =
    React.useState('123456');
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (password !== passwordConfirmation) {
      alert('As senhas precisam ser iguais');
      setLoading(false);
      return;
    }

    if (!name || !email || !password || !passwordConfirmation) {
      alert('Preencha todos os campos');
      setLoading(false);
      return;
    }

    try {
      const user = { name, email, password };
      axios
        .post('http://localhost:3333/api/users', user)
        .then((response) => {
          if (response.statusText === 'OK') {
            alert('Usuário criado com sucesso, faça login para usar o sistema');
            navigate('/login');
          }
        })
        .catch((error) => {
          alert(
            'Erro ao criar usuário, verifique os dados e tente novamente, caso já possua um usuário, faça login'
          );
          console.log(error);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="register-main">
      {loading ? <Loader /> : null}
      <div className="card-background"></div>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <h1 className="card-title">Cadastre-se</h1>
          <div className="form-group">
            <label htmlFor="name">Nome Completo</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Insira seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
          <div className="form-group">
            <label htmlFor="password">Confirme Senha</label>
            <input
              type="password"
              className="form-control"
              id="password-check"
              placeholder="Confirme Senha"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-submit">
            Cadastrar
          </button>
          <div className="register-field">
            Já possui conta?
            <a onClick={() => navigate('/login')}>Faça login</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export { Register };
