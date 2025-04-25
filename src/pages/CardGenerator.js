import React, { useState, useEffect } from "react";
import clsx from "clsx"; // Optional but useful for conditional classNames

const elements = ["Fire", "Earth", "Air", "Water"];
const types = ["Attack", "Defend", "Heal"];
const specialTypes = ["block", "heal", "damage-over-time", "buff", "debuff"];
const rarities = ["Common", "Uncommon", "Rare", "Epic", "Legendary"];

const specialPrefixes = {
  block: ["Shielded", "Guarded", "Fortified"],
  heal: ["Restoring", "Healing", "Mending"],
  "damage-over-time": ["Burning", "Venomous", "Lingering"],
  buff: ["Empowered", "Energized", "Blessed"],
  debuff: ["Cursed", "Weakened", "Corrupting"],
};

const elementKeywords = {
  Fire: {
    Attack: ["Flame Strike", "Inferno Slash", "Blazing Jab"],
    Defend: ["Ember Wall", "Flare Guard", "Ashen Shield"],
    Heal: ["Smoldering Spirit", "Ash Revival", "Flame Mender"],
  },
  Earth: {
    Attack: ["Stone Slam", "Boulder Bash", "Terra Punch"],
    Defend: ["Rock Shield", "Earth Wall", "Granite Guard"],
    Heal: ["Earthen Embrace", "Nature's Touch", "Soil Healing"],
  },
  Air: {
    Attack: ["Gale Slash", "Wind Cutter", "Cyclone Shot"],
    Defend: ["Wind Cloak", "Breeze Barrier", "Feather Guard"],
    Heal: ["Breath of Life", "Sky Restoration", "Airborne Heal"],
  },
  Water: {
    Attack: ["Wave Crash", "Tide Jab", "Frosted Strike"],
    Defend: ["Tide Barrier", "Ice Shell", "Mist Guard"],
    Heal: ["Soothing Stream", "Rainfall Blessing", "Aqua Recovery"],
  },
};

const elementColors = {
  Fire: "bg-red-100 border-red-500 text-red-800",
  Earth: "bg-green-100 border-green-500 text-green-800",
  Air: "bg-blue-100 border-blue-400 text-blue-800",
  Water: "bg-cyan-100 border-cyan-500 text-cyan-800",
};

const rarityColors = {
  Common: "text-gray-700",
  Uncommon: "text-green-700",
  Rare: "text-blue-700",
  Epic: "text-purple-700",
  Legendary: "text-yellow-600",
};

const getRandomItem = (list) => list[Math.floor(Math.random() * list.length)];

const generateCard = () => {
  const element = getRandomItem(elements);
  const type = getRandomItem(types);
  const rarity = getRandomItem(rarities);
  const cost = Math.floor(Math.random() * 5) + 1;
  const value = Math.floor(Math.random() * 21) + 10;
  const specialType = getRandomItem(specialTypes);
  const specialValue = Math.floor(Math.random() * 16) + 5;
  const specialDuration = Math.floor(Math.random() * 5) + 1;

  const prefix = getRandomItem(specialPrefixes[specialType] || []);
  const baseName = getRandomItem(
    elementKeywords[element][type] || [`${element} ${type}`]
  );
  const name = `${prefix} ${baseName}`.trim();

  return {
    name,
    element,
    value,
    cost,
    type,
    special:
      specialType === "damage-over-time"
        ? {
            name: specialType.charAt(0).toUpperCase() + specialType.slice(1),
            type: specialType,
            value: specialValue,
            duration: specialDuration,
          }
        : {
            name: specialType.charAt(0).toUpperCase() + specialType.slice(1),
            type: specialType,
            value: specialValue,
          },
    rarity,
  };
};

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
                <strong>Special:</strong>{" "}
                <span className="capitalize">{card.special.name}</span> (
                {card.special.type}) - {card.special.value}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CardGenerator;
