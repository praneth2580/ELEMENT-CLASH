import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { elementColors, generateCard, rarityColors } from "../scripts/Cards";

const CardGenerator = () => {
  const [cards, setCards] = useState([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const newCards = Array.from({ length: 100 }, generateCard);
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card, index) => {
          const elementStyle =
            elementColors[card.element] ||
            "bg-gray-100 border-gray-400 text-gray-800";
          const rarityStyle = rarityColors[card.rarity] || "text-gray-700";

          return (
            <div
              key={index}
              className={clsx(
                "border-2 rounded-xl shadow-md p-4 transition transform hover:scale-105",
                elementStyle
              )}
            >
              <h2 className={`text-xl font-bold mb-1 ${rarityStyle}`}>
                {card.name}
              </h2>
              <p>
                <strong>Element:</strong> {card.element}
              </p>
              <p>
                <strong>Type:</strong>{" "}
                <span className="capitalize">{card.type}</span>
              </p>
              <p>
                <strong>Cost:</strong> {card.cost}
              </p>
              <p>
                <strong>Value:</strong> {card.value}
              </p>
              <p>
                <strong>Rarity:</strong>{" "}
                <span className={rarityStyle}>{card.rarity}</span>
              </p>
              <p>
                <strong>Special:</strong> {card.special.name} (
                {card.special.type}) - {card.special.value}
              </p>
              <p>
                <strong>Trait:</strong> {card.trait}
              </p>
              <p>
                <strong>Affinity:</strong> {card.affinity.strongAgainst}{" "}
                (Strong), {card.affinity.weakAgainst} (Weak)
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CardGenerator;
