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
    // updateDecks("test4", 1, "#ffffff", "#000000", [])
    // updateDecks("test5", 1, "#ffffff", "#000000", [])
    // updateDecks("test6", 1, "#ffffff", "#000000", [])
    // updateDecks("test7", 1, "#ffffff", "#000000", [])
    // updateDecks("test8", 1, "#ffffff", "#000000", [])
    // updateDecks("test9", 1, "#ffffff", "#000000", [])
    // updateDecks("test10", 1, "#ffffff", "#000000", [])
    // updateDecks("test11", 1, "#ffffff", "#000000", [])
    // updateDecks("test12", 1, "#ffffff", "#000000", [])
    // updateDecks("test13", 1, "#ffffff", "#000000", [])
    // updateDecks("test14", 1, "#ffffff", "#000000", [])
    // updateDecks("test15", 1, "#ffffff", "#000000", [])
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
