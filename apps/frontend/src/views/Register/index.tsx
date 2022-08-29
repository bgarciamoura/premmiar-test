import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuthHook';

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [name, setName] = React.useState('Bruno');
  const [email, setEmail] = React.useState('teste@bg.com.br');
  const [password, setPassword] = React.useState('123');
  const [passwordConfirmation, setPasswordConfirmation] = React.useState('123');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log('submit', name, email, password, passwordConfirmation);
    if (password !== passwordConfirmation) {
      alert('As senhas precisam ser iguais');
      return;
    }

    if (!name || !email || !password || !passwordConfirmation) {
      alert('Preencha todos os campos');
      return;
    }

    login(email, password).then((data) => {
      console.log('login', data);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
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

      <button type="submit" className="btn btn-primary">
        Cadastrar
      </button>
    </form>
  );
};

export { Register };
