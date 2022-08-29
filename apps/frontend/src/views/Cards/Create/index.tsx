import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../../../components/Loader';
import { Navbar } from '../../../components/Navbar';
import { useAuth } from '../../../hooks/useAuth';
import './styles.css';

const CreateCard = () => {
  const { logout, token, user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [name, setName] = React.useState('Teste de carta');
  const [cmc, setCmc] = React.useState(0);
  const [type, setType] = React.useState('Encantamento');
  const [text, setText] = React.useState(
    'Vire a carta para devolver uma criatura alvo para a mão de seu dono'
  );
  const [rarity, setRarity] = React.useState('Incomum');
  const [artist, setArtist] = React.useState('John Doe');
  const [power, setPower] = React.useState(0);
  const [toughness, setToughness] = React.useState(0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!name || !cmc || !type || !text || !rarity || !artist) {
      alert('Preencha todos os campos!');
      setLoading(false);
      return;
    }

    try {
      const card = { name, cmc, type, text, rarity, artist, power, toughness };
      axios
        .post(`http://localhost:3333/api/cards/${user.userId}`, card, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            alert('Carta criada com sucesso!');

            setName('');
            setCmc(0);
            setType('');
            setText('');
            setRarity('');
            setArtist('');
            setPower(0);
            setToughness(0);
            setLoading(false);
          }
        })
        .catch((error) => {
          alert(
            'Erro ao fazer cadastrar sua carta, verifique os dados e tente novamente'
          );
          console.log(error);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);

      setLoading(false);
    }
  };

  return (
    <>
      {loading ? <Loader /> : null}
      <Navbar />
      <div className="main">
        <div className="form-wrapper">
          <form onSubmit={handleSubmit}>
            <h1 className="card-title">Crie sua carta</h1>

            <div className="form-group">
              <label htmlFor="name">Nome da carta</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Insira o nome da carta"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="cmc">Custo de mana</label>
              <input
                type="text"
                className="form-control"
                id="cmc"
                placeholder="Insira o custo de mana da carta"
                value={cmc}
                onChange={(e) => setCmc(Number(e.target.value))}
              />
            </div>

            <div className="form-group">
              <label htmlFor="type">Tipo da carta</label>
              <input
                type="text"
                className="form-control"
                id="type"
                placeholder="Insira o tipo da carta"
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="rarity">Raridade da carta</label>
              <input
                type="text"
                className="form-control"
                id="rarity"
                placeholder="Raridade da carta"
                value={rarity}
                onChange={(e) => setRarity(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="text">Texto da carta</label>
              <input
                type="text"
                className="form-control"
                id="text"
                placeholder="Insira o texto da carta"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="artist">Desenhista</label>
              <input
                type="text"
                className="form-control"
                id="artist"
                placeholder="Insira o nome do desenhista da carta"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="power">Poder da carta</label>
              <input
                type="text"
                className="form-control"
                id="power"
                placeholder="Insira o poder da carta"
                value={power}
                onChange={(e) => setPower(Number(e.target.value))}
              />
            </div>

            <div className="form-group">
              <label htmlFor="toughness">Resistencia da carta</label>
              <input
                type="text"
                className="form-control"
                id="toughness"
                placeholder="Insira o poder da carta"
                value={toughness}
                onChange={(e) => setToughness(Number(e.target.value))}
              />
            </div>

            <button type="submit" className="btn-submit">
              Criar
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export { CreateCard };
