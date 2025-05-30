import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { elementColors, generateCard, rarityColors } from "../scripts/Cards";
import Card from "../components/Card";
import { useCardGameStorage } from "../data/hooks/useCardGameStorage";
import generateCards from "../scripts/CardGenerator";
import Tabs from "../components/Tabs";

const CardGenerator = () => {
  const [cards, setCards] = useState([]);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const { saveCards } = useCardGameStorage();

  useEffect(() => {
    const newCards = generateCard(100);
    // console.log(newCards);
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

  const handleSaveCards = () => {
    saveCards(cards);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  console.log(cards);

  const tabs = [
    {
      label: "Table",
      content: <CardTable cards={cards}/>
    },
    {
      label: "Stack",
      content: <CardGrid cards={cards}/>
    },
  ]

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-4">
        Element Clash - Card Generator
      </h1>

      <div className="flex justify-center mb-4 gap-2">
        <button
          onClick={handleCopyJSON}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {copied ? "Copied!" : "Copy JSON"}
        </button>
        <button
          onClick={handleSaveCards}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          {saved ? "Saved!" : "Save Cards"}
        </button>
      </div>

      <Tabs tabs={tabs}/>
    </div>
  );
};

function CardGrid({ cards }) {
  return(
    <div className="flex flex-wrap gap-3">
      {cards.map((card, index) => {
        return (
          <div key={index}>
            <Card key={"C-" + index} card={card} />
          </div>
        );
      })}
    </div>
  );
}

function CardTable({ cards }) {
  return (
    <div className="p-4 max-w-full overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Element
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Cost</th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Value
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Rarity
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Special Effect
            </th>
          </tr>
        </thead>
        <tbody>
          {cards &&
            cards.length > 0 &&
            cards.map((card) => (
              <tr key={card.id} className="even:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{card.id}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {card.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {card.element}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {card.type}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {card.cost}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {card.value}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {card.rarity}
                </td>
                <td className="border border-gray-300 px-4 py-2 italic text-gray-600">
                  {card.special
                    ? `${card.special.name} (${card.special.type}, ${card.special.value})`
                    : "-"}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default CardGenerator;
