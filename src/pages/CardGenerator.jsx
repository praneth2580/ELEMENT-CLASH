import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { elementColors, generateCard, rarityColors } from "../scripts/Cards";
import Card from "../components/Card";

const CardGenerator = () => {
  const [cards, setCards] = useState([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const newCards = Array.from({ length: 100 }, generateCard);
    console.log(JSON.stringify(newCards[0]));
    setCards(newCards);
  }, []);

  const handleCopyJSON = () => {
    const json = JSON.stringify(cards, null, 2);
    navigator.clipboard
      .writeText(json)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => console.error("Copy failed", err));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-4">
        Element Clash - Card Generator
      </h1>

      <div className="flex justify-center mb-4">
        <button
          onClick={handleCopyJSON}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {copied ? "Copied!" : "Copy JSON"}
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        {cards.map((card, index) => {
          return (
            <div>
              <Card key={index} card={card} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CardGenerator;
