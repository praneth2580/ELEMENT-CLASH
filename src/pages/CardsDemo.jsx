// pages/Demo.jsx
import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import "../Card.css";
import { generateCard } from "../scripts/Cards";

const CardsDemo = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const newCards = Array.from({ length: 3 }, generateCard); // Generate 3 random cards
    setCards(newCards);
  }, []);

  console.log(cards)
  return (
    <div className="flex p-1 gap-1">
      {cards.map((card, index) => (
        <Card key={index} card={card} />
      ))}
    </div>
  );
};

export default CardsDemo;
