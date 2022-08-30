import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import { Navbar } from '../../components/Navbar';
import { useAuth } from '../../hooks/useAuth';
import './styles.css';

const Card = () => {
  const { logout, token, user } = useAuth();
  const navigate = useNavigate();
  const { cardId } = useParams();
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

  useEffect(() => {
    setLoading(true);
    if (cardId) {
      axios
        .get(`http://localhost:3333/api/cards/${cardId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const card = res.data;
          setName(card.name);
          setCmc(card.cmc);
          setType(card.type);
          setText(card.text);
          setRarity(card.rarity);
          setArtist(card.artist);
          setPower(card.power);
          setToughness(card.toughness);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
    setLoading(false);
  }, [cardId]);

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
      if (cardId) {
        await axios
          .put(`http://localhost:3333/api/cards/${cardId}`, card, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            alert('Carta atualizada com sucesso!');
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
      } else {
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
      }
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
                type="number"
                min={0}
                className="form-control"
                id="cmc"
                placeholder="Insira o custo de mana da carta"
                value={cmc}
                onChange={(e) => setCmc(Number(e.target.value))}
              />
            </div>

            <div className="form-group">
              <label htmlFor="type">Tipo da carta</label>
              <select
                name="type"
                id="type"
                onChange={(e) => setType(e.target.value)}
                value={type}
                defaultValue={type}
              >
                <option value="Criatura">Criatura</option>
                <option value="Encantamento">Encantamento</option>
                <option value="Feitiço">Feitiço</option>
                <option value="Artefato">Artefato</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="rarity">Raridade da carta</label>
              <select
                name="rarity"
                id="rarity"
                onChange={(e) => setRarity(e.target.value)}
                value={rarity}
                defaultValue={rarity}
              >
                <option value="Comum">Comum</option>
                <option value="Incomum">Incomum</option>
                <option value="Raro">Raro</option>
                <option value="Mítica">Mítica</option>
              </select>
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
              {cardId ? 'Atualizar' : 'Criar'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export { Card };
