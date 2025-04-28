// pages/Demo.jsx
import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import '../Card.css';
import { generateCard } from '../scripts/Cards';

const CardsDemo = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const newCards = Array.from({ length: 3 }, generateCard); // Generate 3 random cards
    setCards(newCards);
  }, []);

  return (
    <div className="cards-grid">
      {cards.map((card, index) => (
        <Card
          key={index}
          name={card.name}
          element={card.element}
          value={card.value}
          cost={card.cost}
          type={card.type}
          special={card.special}
          rarity={card.rarity}
          trait={card.trait}
          affinity={card.affinity}
          specialReady={Math.random() > 0.5} // Randomly set specialReady
        />
      ))}
    </div>
  );
};

export default CardsDemo;
