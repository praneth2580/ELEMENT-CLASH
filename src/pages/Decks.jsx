import React, { useEffect, useState } from "react";
import Deck from "../components/Deck";
import { useCardGameStorage } from "../data/hooks/useCardGameStorage";

const Decks = ({}) => {
  const [selectedCards, setSelectedCards] = useState([]);
  const {cards, decks, updateDecks} = useCardGameStorage();

  const toggleCardSelection = (card) => {
    if (selectedCards.find((c) => c.id === card.id)) {
      setSelectedCards(selectedCards.filter((c) => c.id !== card.id));
    } else if (selectedCards.length < 12) {
      setSelectedCards([...selectedCards, card]);
    }
  };

  const handleupdateDecks = () => {
    if (selectedCards.length >= 10 && selectedCards.length <= 12) {
      updateDecks(selectedCards);
      setSelectedCards([]);
    } else {
      alert("Please select between 10 and 12 cards to save the deck.");
    }
  };

  useEffect(() => {
  }, []);

  return (
    <div className="p-4 bg-gray-900 min-h-screen text-white">
      <h1 className="text-2xl text-center font-bold mb-4">Build Your Deck</h1>
      {decks.map((deck) => (
        <Deck
          key={deck.id}
          onClick={() => {}}
          type={deck.type}
          name={deck.name}
          color={deck.fg_color} 
        />
      ))}
    </div>
  );
};

export default Decks;