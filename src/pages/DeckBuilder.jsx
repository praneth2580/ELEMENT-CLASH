import React, { useEffect, useState } from "react";
import Deck from "../components/Deck";
import Card from "../components/Card";
import { deckLogos } from "../config";
import { useCardGameStorage } from "../data/hooks/useCardGameStorage";

export default function Decks({}) {
  const [selectedDeck, setSelectedDeck] = useState(null);
  const { cards, decks, updateDecks } = useCardGameStorage();

  // const handleupdateDecks = () => {
  //   if (selectedCards.length >= 10 && selectedCards.length <= 12) {
  //     updateDecks(selectedCards);
  //     setSelectedCards([]);
  //   } else {
  //     alert("Please select between 10 and 12 cards to save the deck.");
  //   }
  // };

  useEffect(() => {}, []);

  return (
    <>
      {selectedDeck ? (
        <DeckBuilder deck={selectedDeck} />
      ) : (
        <div className="p-4 bg-gray-900 min-h-screen text-white">
          <h1 className="text-2xl text-center font-bold mb-4">
            Build Your Deck
          </h1>
          <div className="grid grid-cols-6 gap-2">
            {decks.map((deck) => (
              <Deck
                key={deck.id}
                onClick={() => setSelectedDeck(deck)}
                type={deck.type}
                name={deck.name}
                color={deck.fg_color}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

const DeckBuilder = ({deck}) => {
  const [deckName, setDeckName] = useState(deck.name);
  const [deckCover, setDeckCover] = useState(null);
  const [selectedCards, setSelectedCards] = useState([]);
  const deckLogoKeys = Object.keys(deckLogos);
  const [selectedDeckLogo, setSelectedDeckLogo] = useState(deckLogoKeys[0]);

  const { cards } = useCardGameStorage();

  const toggleCard = (card) => {
    if (selectedCards.find((c) => c.id === card.id)) {
      setSelectedCards((prev) => prev.filter((c) => c.id !== card.id));
    } else if (selectedCards.length < 12) {
      setSelectedCards((prev) => [...prev, card]);
    }
  };

  return (
    <div className="p-4 space-y-4 max-w-screen-xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <input
          value={deckName}
          onChange={(e) => setDeckName(e.target.value)}
          placeholder="Enter Deck Name"
          className="w-full md:max-w-sm px-4 py-2 border-none hover:outline-none caret-transparent rounded"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col items-start gap-2">
          <label class="block mb-1 text-sm text-slate-800">Cover</label>
          <div class="w-full max-w-sm min-w-[200px]">
            <div class="relative">
              <select
                onClick={(e) => setSelectedDeckLogo(e.target.value)}
                class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
              >
                {deckLogoKeys.map((logo, idx) => (
                  <option key={idx} value={logo}>
                    {logo}
                  </option>
                ))}
              </select>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.2"
                stroke="currentColor"
                class="h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-slate-700"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                />
              </svg>
            </div>
          </div>
          <div className="w-48 bg-slate-400">
            <Deck type={selectedDeckLogo} color="#fff" />
          </div>
        </div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h2 className="font-bold mb-2">
              Selected Cards ({selectedCards.length}/12)
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-2 border rounded-md">
              {selectedCards.map((card, idx) => (
                <Card card={card} key={idx} />
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-bold mb-2">Available Cards ({cards.length})</h2>
            <div className="grid grid-cols-5 gap-1 overflow-auto p-2 border rounded-md">
              {cards.map((card, idx) => (
                <div className="w-32 h-fill">
                  <Card
                    onClick={(openDetails) => toggleCard(card)}
                    card={card}
                    key={idx}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
