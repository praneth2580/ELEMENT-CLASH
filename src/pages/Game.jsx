import React, { useEffect, useRef, useState } from "react";
import { removeByIndexes } from "../functions";
import Player from "../scripts/Player";
import AI from "../scripts/Ai";
import GameBoard from "../components/Board"; // ⭐ your Card component
import "../Card.css"; // ⭐ card styles
import { Tooltip } from "react-tooltip"; // ✨ New tooltip library
import "react-tooltip/dist/react-tooltip.css"; // ✨ Tooltip CSS
import DevBoard from "../components/DevBoard";
import { specialTypes } from "../scripts/Cards";
import { useCardGameStorage } from "../data/hooks/useCardGameStorage";
import { DeckPopup } from "../components/DeckPopup";

export default function ElementClash({ dev }) {
  let playerRef = useRef(null);
  let aiRef = useRef(null);

  const { cards } = useCardGameStorage();

  const [playerStats, setPlayerStats] = useState({
    HP: 0,
    shield: 0,
    aura: 0,
    tac_aura: 0,
    deck: [],
    effects: [],
    hand: [],
    card: null,
  });
  const [aiStats, setAiStats] = useState({
    HP: 0,
    shield: 0,
    aura: 0,
    tac_aura: 0,
    deck: [],
    effects: [],
    hand: [],
    card: null,
  });

  const [isDeckModalOpen, setIsDeckModalOpen] = useState(true)
  const [currentTurn, setCurrentTurn] = useState(0); // 0 = Player, 1 = AI
  const [currentRound, setCurrentRound] = useState(1);
  const [message, setMessage] = useState("Let the clash begin!");

  const auraPerRound = (round) => {
    let increment = 0;
    if (round < 6) increment = round;
    else if (round >= 6 && round <= 10) increment = round / 2;
    else increment = 6;

    playerRef.current?.addAura(increment);
    aiRef.current?.addAura(increment);
  };

  function syncStats() {
    setPlayerStats(playerRef.current.getStats());
    setAiStats(aiRef.current.getStats());
  }

  function isGameOver() {
    if (playerRef.current.HP <= 0 || aiRef.current.HP <= 0) {
      setMessage(
        `${playerRef.current.HP <= 0 ? "AI" : "Player"} has won the Game`
      );
      setCurrentTurn(-1);
      return true;
    }
    return false;
  }

  const playCard = (card) => {};

  useEffect(() => {
    if (cards.length === 0) return; // Wait until cards are loaded

    // INITIATE REFERENCES
    playerRef.current = new Player(100, cards);
    aiRef.current = new AI(100, cards);

    // DRAW NEW CARD TO HAND
    playerRef.current.drawHand(3);
    aiRef.current.drawHand(3);

    syncStats();
  }, [cards]);

  // AFTER EVERY TURN
  useEffect(() => {
    if (cards.length === 0) return; // Wait until cards are loaded
  }, [currentTurn]);

  // AFTER EVERY ROUND
  useEffect(() => {
    if (cards.length === 0) return; // Wait until cards are loaded

    if (isGameOver()) return;
    setCurrentTurn(0);
    auraPerRound(currentRound);
  }, [currentRound]);

  return (
    <>
      <DeckPopup isOpen={isDeckModalOpen} cards={cards}/>
      {dev ? (
        <DevBoard
          playerStats={playerStats}
          aiStats={aiStats}
          currentRound={currentRound}
          currentTurn={currentTurn}
          message={message}
          playCard={playCard}
        />
      ) : (
        <GameBoard
          playerStats={playerStats}
          aiStats={aiStats}
          playerHand={playerStats.hand}
          playerDeck={playerRef.current?.deck}
          onCardPlay={playCard}
          currentTurn={currentTurn}
          currentRound={currentRound}
          message={message}
        />
      )}
    </>
  );
}
