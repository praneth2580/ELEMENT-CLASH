import React, { useEffect, useRef, useState } from "react";
import Deck from "../components/Deck";
import Card from "../components/Card";
import AddDeck from "../components/AddDeck";
import { deckLogos, defaultDeck } from "../config";
import { useCardGameStorage } from "../data/hooks/useCardGameStorage";

export default function Decks({}) {
  const [selectedDeck, setSelectedDeck] = useState(null);
  const { cards, decks, updateDecks } = useCardGameStorage();
  const [newCreated, setNewCreated] = useState(false);

  const createNewDeck = () => {
    updateDecks(
      defaultDeck.id,
      defaultDeck.name,
      defaultDeck.type,
      defaultDeck.fg_color,
      defaultDeck.bg_color,
      []
    );
    setNewCreated(true)
  };

  useEffect(() => {

    if (!newCreated) return;

    setSelectedDeck(decks[decks.length - 1]);

    setNewCreated(false);

  }, [decks])

  return (
    <>
      {selectedDeck ? (
        <DeckBuilder
          deck={selectedDeck}
          cards={cards}
          updateDecks={updateDecks}
        />
      ) : (
        <div className="p-4 bg-gray-900 min-h-screen text-white">
          <h1 className="text-2xl text-center font-bold mb-4">
            Build Your Deck
          </h1>
          <div className="grid grid-cols-6 gap-2">
            <AddDeck onClick={createNewDeck} />
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

const getUniqueValues = (cards, key) => {
  return [...new Set(cards.map((c) => c[key]))];
};

const FilterDropdown = ({
  open,
  anchorRef,
  onClose,
  filters,
  setFilters,
  cards,
}) => {
  const dropdownRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    if (!open) return;

    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        anchorRef.current &&
        !anchorRef.current.contains(event.target)
      ) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onClose, anchorRef]);

  if (!open) return null;

  const uniqueTypes = getUniqueValues(cards, "type");
  const uniqueElements = getUniqueValues(cards, "element");
  const uniqueRarities = getUniqueValues(cards, "rarity");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    if (value === "" || /^\d*$/.test(value)) {
      setFilters((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleReset = () => {
    setFilters({
      type: "All",
      element: "All",
      rarity: "All",
      valueMin: "",
      valueMax: "",
      costMin: "",
      costMax: "",
    });
  };

  return (
    <div
      ref={dropdownRef}
      className="absolute mt-2 right-0 w-72 bg-gray-900 text-white rounded-md shadow-lg border border-gray-700 z-50 p-4 select-none"
      style={{ minWidth: 280 }}
    >
      <h3 className="font-semibold text-lg mb-3">Filter Cards</h3>

      {/* Type */}
      <div className="mb-3">
        <label className="block text-sm font-medium mb-1 flex items-center gap-1">
          <span>Type</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </label>
        <select
          name="type"
          value={filters.type}
          onChange={handleChange}
          className="w-full rounded bg-gray-800 text-white px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All</option>
          {uniqueTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Element */}
      <div className="mb-3">
        <label className="block text-sm font-medium mb-1 flex items-center gap-1">
          <span>Element</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v18m9-9H3"
            />
          </svg>
        </label>
        <select
          name="element"
          value={filters.element}
          onChange={handleChange}
          className="w-full rounded bg-gray-800 text-white px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All</option>
          {uniqueElements.map((el) => (
            <option key={el} value={el}>
              {el}
            </option>
          ))}
        </select>
      </div>

      {/* Rarity */}
      <div className="mb-3">
        <label className="block text-sm font-medium mb-1 flex items-center gap-1">
          <span>Rarity</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </label>
        <select
          name="rarity"
          value={filters.rarity}
          onChange={handleChange}
          className="w-full rounded bg-gray-800 text-white px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All</option>
          {uniqueRarities.map((rar) => (
            <option key={rar} value={rar}>
              {rar}
            </option>
          ))}
        </select>
      </div>

      {/* Value Range */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <label className="block text-sm font-medium mb-1">Value Min</label>
          <input
            type="text"
            name="valueMin"
            value={filters.valueMin}
            onChange={handleNumberChange}
            placeholder="Min"
            className="w-full rounded bg-gray-800 text-white px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Value Max</label>
          <input
            type="text"
            name="valueMax"
            value={filters.valueMax}
            onChange={handleNumberChange}
            placeholder="Max"
            className="w-full rounded bg-gray-800 text-white px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Cost Range */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1">Cost Min</label>
          <input
            type="text"
            name="costMin"
            value={filters.costMin}
            onChange={handleNumberChange}
            placeholder="Min"
            className="w-full rounded bg-gray-800 text-white px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Cost Max</label>
          <input
            type="text"
            name="costMax"
            value={filters.costMax}
            onChange={handleNumberChange}
            placeholder="Max"
            className="w-full rounded bg-gray-800 text-white px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex justify-between gap-2">
        <button
          onClick={handleReset}
          className="flex-1 bg-red-600 hover:bg-red-700 transition text-white rounded py-1 text-sm"
        >
          Reset
        </button>
        <button
          onClick={onClose}
          className="flex-1 bg-green-600 hover:bg-green-700 transition text-white rounded py-1 text-sm"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

const DeckBuilder = ({ deck, cards, updateDecks }) => {
  const [deckName, setDeckName] = useState(deck.name);
  const [selectedCards, setSelectedCards] = useState(deck.cards);
  const deckLogoKeys = Object.keys(deckLogos);
  const [selectedDeckLogo, setSelectedDeckLogo] = useState(deck.type);

  const toggleCard = (card) => {
    if (selectedCards.find((c) => c.id === card.id)) {
      setSelectedCards((prev) => prev.filter((c) => c.id !== card.id));
    } else if (selectedCards.length < 12) {
      setSelectedCards((prev) => [...prev, card]);
    }
  };

  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    type: "All",
    element: "All",
    rarity: "All",
    valueMin: "",
    valueMax: "",
    costMin: "",
    costMax: "",
  });

  const filterButtonRef = useRef(null);

  useEffect(() => {
    updateDecks(
      deck.id,
      deckName,
      selectedDeckLogo,
      deck.fg_color,
      deck.bg_color,
      selectedCards
    );
  }, [deckName, selectedCards, selectedDeckLogo]);

  const filteredCards = cards.filter((card) => {
    if (filters.type !== "All" && card.type !== filters.type) return false;
    if (filters.element !== "All" && card.element !== filters.element)
      return false;
    if (filters.rarity !== "All" && card.rarity !== filters.rarity)
      return false;

    if (filters.valueMin !== "" && card.value < Number(filters.valueMin))
      return false;
    if (filters.valueMax !== "" && card.value > Number(filters.valueMax))
      return false;

    if (filters.costMin !== "" && card.cost < Number(filters.costMin))
      return false;
    if (filters.costMax !== "" && card.cost > Number(filters.costMax))
      return false;

    return true;
  });

  return (
    <div className="p-4 space-y-4 max-w-screen-xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <input
          value={deckName}
          onChange={(e) => setDeckName(e.target.value)}
          placeholder="Enter Deck Name"
          className="w-full md:max-w-sm px-4 py-2 border-none rounded focus:border-none focus:outline-none focus:ring-blue-500 caret-transparent"
        />

        <div className="relative" ref={filterButtonRef}>
          <button
            onClick={() => setFilterOpen((open) => !open)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition flex items-center gap-2"
            aria-haspopup="true"
            aria-expanded={filterOpen}
          >
            Filters
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-5 h-5 transition-transform duration-300 ${
                filterOpen ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          <FilterDropdown
            open={filterOpen}
            anchorRef={filterButtonRef}
            onClose={() => setFilterOpen(false)}
            filters={filters}
            setFilters={setFilters}
            cards={cards}
          />
        </div>
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
                  <option selected={logo == deck.type} key={idx} value={logo}>
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
              {filteredCards.length === 0 ? (
                <p className="text-center text-gray-600 col-span-full">
                  No cards match filters.
                </p>
              ) : (
                filteredCards.map((card, idx) => (
                  <div className="w-32 h-fill">
                    <Card
                      onClick={(openDetails) => toggleCard(card)}
                      card={card}
                      key={idx}
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
