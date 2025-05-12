// /data/hooks/useCardGameStorage.js
import { useState, useEffect } from 'react';
import db from '../db'; // your Dexie instance

export const useCardGameStorage = () => {
  const [cards, setCards] = useState([]);
  const [decks, setDecks] = useState([]);
  const [roundsPlayed, setRoundsPlayed] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      const allCards = await db.cards.toArray();
      const allDecks = await db.decks.toArray();
      const rounds = await db.stats.get('roundsPlayed');
      
      setCards(allCards);
      setDecks(allDecks);
      setRoundsPlayed(rounds?.value || 0);
    };
    loadData();
    // updateDecks("test1", 1, "#ffffff", "#000000", [])
    // updateDecks("test2", 1, "#ffffff", "#000000", [])
    // updateDecks("test3", 1, "#ffffff", "#000000", [])
  }, []);

  const saveCards = async (newCards) => {
    await db.cards.clear();
    await db.cards.bulkAdd(newCards);
    setCards(newCards);
  };
  
  // change this
  const updateDecks = async (name, type, fg_color, bg_color, cards) => {
    await db.decks.add({ name: name, type: type, fg_color: fg_color, bg_color: bg_color, cards: cards });
    const allDecks = await db.decks.toArray();

    setDecks(allDecks);
  };

  const updateRounds = async (newRounds) => {
    await db.stats.put({ key: 'roundsPlayed', value: newRounds });
    setRoundsPlayed(newRounds);
  };

  return { cards, decks, roundsPlayed, saveCards, updateDecks, updateRounds };
};
