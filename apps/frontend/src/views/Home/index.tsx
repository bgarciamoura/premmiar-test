import axios from 'axios';
import React, { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { ICards } from '../../interfaces/ICards';
import { Loader } from '../../components/Loader';
import { Navbar } from '../../components/Navbar';
import './styles.css';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);
  const [cards, setCards] = React.useState<Array<ICards>>([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3333/api/cards/user-cards/${user.userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const cardsFromServer = res.data;
        setCards([...cardsFromServer.cards]);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleAddButtonClick = () => {
    navigate('/cards/create');
  };

  return (
    <>
      {loading ? <Loader /> : null}
      <Navbar />
      <div className="main">
        <div className="cards-wrapper">
          <table className="cards">
            <thead>
              <tr>
                <th>
                  <button className="btn-add" onClick={handleAddButtonClick}>
                    Adicionar Carta
                  </button>
                </th>
                <th>Raridade</th>
                <th>Tipo</th>
                <th>CMC</th>
                <th>Descrição</th>
                <th>Data de Criação</th>
              </tr>
            </thead>
            <tbody>
              {cards.map((card) => (
                <tr key={card.id}>
                  <td className="card-name">{card.name}</td>
                  <td className="card-rarity">
                    <span>{card.rarity}</span>
                  </td>
                  <td className="card-type">{card.type}</td>
                  <td className="card-cmc">{card.cmc}</td>
                  <td className="card-text">{card.text}</td>
                  <td className="card-date">
                    {new Date(card.createdAt).toLocaleDateString()}
                  </td>
                  <td>
                    <button className="btn-edit">Editar</button>
                    <button
                      className="btn-delete"
                      onClick={() => console.log('delete')}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export { Home };
