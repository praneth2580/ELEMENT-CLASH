import React, { useState } from 'react';
import Card from '../components/Card';


const ELEMENTS = ['Fire', 'Water', 'Earth', 'Air'];
const TYPES = ['Attack', 'Defend', 'Heal'];
const RARITIES = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary'];

const CardGenerator = () => {
  const [selectedElements, setSelectedElements] = useState([...ELEMENTS]);
  const [selectedTypes, setSelectedTypes] = useState([...TYPES]);
  const [selectedRarity, setSelectedRarity] = useState('Common');
  const [costRange, setCostRange] = useState([0, 10]);
  const [cardCount, setCardCount] = useState(1);
  const [generatedCards, setGeneratedCards] = useState([]);

  const toggleSelection = (list, value, setter) => {
    setter(
      list.includes(value)
        ? list.filter((v) => v !== value)
        : [...list, value]
    );
  };

  const generateRandomCard = () => {
    const element = randomItem(selectedElements);
    const type = randomItem(selectedTypes);
    const cost = randomInt(costRange[0], costRange[1]);
    const value = Math.round(cost * (1.2 + Math.random() * 0.6));

    return {
      name: `${element} ${type} ${Math.floor(Math.random() * 1000)}`,
      element,
      type,
      rarity: selectedRarity,
      cost,
      value,
    };
  };

  const handleGenerate = () => {
    const newCards = Array.from({ length: cardCount }, generateRandomCard);
    setGeneratedCards(newCards);
  };

  return (
    <div className="p-4 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Controls */}
      <div className="col-span-1 space-y-4">
        <h2 className="text-xl font-bold">Element Clash</h2>

        <div>
          <h3 className="font-semibold">Elements</h3>
          {ELEMENTS.map((el) => (
            <label key={el} className="block">
              <input
                type="checkbox"
                checked={selectedElements.includes(el)}
                onChange={() => toggleSelection(selectedElements, el, setSelectedElements)}
              />{' '}{el}
            </label>
          ))}
        </div>

        <div>
          <h3 className="font-semibold">Types</h3>
          {TYPES.map((type) => (
            <label key={type} className="block">
              <input
                type="checkbox"
                checked={selectedTypes.includes(type)}
                onChange={() => toggleSelection(selectedTypes, type, setSelectedTypes)}
              />{' '}{type}
            </label>
          ))}
        </div>

        <div>
          <label className="block font-semibold">Rarity</label>
          <select value={selectedRarity} onChange={(e) => setSelectedRarity(e.target.value)}>
            {RARITIES.map((rarity) => (
              <option key={rarity} value={rarity}>{rarity}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold">Cost Range</label>
          <input
            type="range"
            min={0}
            max={10}
            value={costRange[1]}
            onChange={(e) => setCostRange([0, parseInt(e.target.value)])}
          />
          <div>0 - {costRange[1]}</div>
        </div>

        <div>
          <label className="block font-semibold">How many cards?</label>
          <input
            type="number"
            value={cardCount}
            min={1}
            max={50}
            onChange={(e) => setCardCount(parseInt(e.target.value))}
          />
        </div>

        <button
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
          onClick={handleGenerate}
        >
          Generate Card{cardCount > 1 ? 's' : ''}
        </button>
      </div>

      {/* Generated Cards */}
      <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {generatedCards.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
    </div>
  );
};

const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export default CardGenerator;
