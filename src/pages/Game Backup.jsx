import React, { useEffect, useRef, useState } from "react";
import { removeByIndexes } from "../functions";
import Player from "../scripts/Player";
import AI from "../scripts/Ai";
import Card from "../components/Card"; // ⭐ your Card component
import "../Card.css"; // ⭐ card styles
import { Tooltip } from "react-tooltip"; // ✨ New tooltip library
import "react-tooltip/dist/react-tooltip.css"; // ✨ Tooltip CSS

export default function ElementClash() {
  const playerRef = useRef(null);
  const aiRef = useRef(null);

  const [playerStats, setPlayerStats] = useState({
    HP: 0,
    shield: 0,
    effects: [],
    hand: [],
    aura: 0,
  });
  const [aiStats, setAiStats] = useState({
    HP: 0,
    shield: 0,
    effects: [],
    hand: [],
    aura: 0,
  });

  const [currentTurn, setCurrentTurn] = useState(0); // 0 = Player, 1 = AI
  const [currentRound, setCurrentRound] = useState(1);
  const [message, setMessage] = useState("Let the clash begin!");

  useEffect(() => {
    playerRef.current = new Player(100);
    aiRef.current = new AI(100);

    playerRef.current.drawHand(3);
    aiRef.current.drawHand(3);

    syncStats();
  }, []);

  useEffect(() => {
    if (checkGameOver()) return;
    if (currentTurn === 0) return;

    const aiTurn = setTimeout(() => {
      playCard(aiRef.current.pickFromHand());
      syncStats();
    }, 3000);

    return () => clearTimeout(aiTurn);
  }, [currentTurn]);

  useEffect(() => {
    if (checkGameOver()) return;

    playerRef.current.addAura(1);
    playerRef.current.applySpecial();

    aiRef.current.addAura(1);
    aiRef.current.applySpecial();

    syncStats();
  }, [currentRound]);

  function syncStats() {
    setPlayerStats(playerRef.current.getStats());
    setAiStats(aiRef.current.getStats());
  }

  function endTurn() {
    const nextTurn = (currentTurn + 1) % 2;
    if (nextTurn === 0) {
      setCurrentRound((prev) => prev + 1);
    }
    setCurrentTurn(nextTurn);
  }

  function checkGameOver() {
    if (playerRef.current.HP <= 0 || aiRef.current.HP <= 0) {
      setMessage(
        `${playerRef.current.HP <= 0 ? "AI" : "Player"} has Won the Game`
      );
      return true;
    }
    return false;
  }

  function playCard(card) {
    if (checkGameOver()) return;

    const attacker = currentTurn === 0 ? playerRef.current : aiRef.current;
    const defender = currentTurn === 0 ? aiRef.current : playerRef.current;

    if (card.type.toLowerCase() === "attack") {
      defender.applyDamage(card.value);
      setMessage(
        `${attacker.constructor.name} attacked for ${card.value} damage!`
      );
    } else if (card.type.toLowerCase() === "heal") {
      attacker.heal(card.value);
      setMessage(`${attacker.constructor.name} healed for ${card.value} HP!`);
    } else if (card.type.toLowerCase() === "block") {
      attacker.setShield(card.value);
      setMessage(
        `${attacker.constructor.name} raised a shield of ${card.value}!`
      );
    }

    if (card.special) {
      if (["block", "heal", "buff"].includes(card.special.type)) {
        attacker.addSpecial(card.special);
      } else {
        defender.addSpecial(card.special);
      }
    }

    attacker.cardPlayered(attacker.hand.indexOf(card));
    syncStats();
    endTurn();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">⚡ Element Clash ⚡</h1>
        <p className="text-lg">{message}</p>
        <p className="text-sm text-gray-600 mt-1">
          Round {currentRound} | Turn: {currentTurn === 0 ? "Player" : "AI"}
        </p>
      </div>

      {/* AI Info Only */}
      <div className="flex flex-col items-center space-y-2">
        <h2 className="text-xl font-semibold">🤖 AI Opponent</h2>
        <p>
          HP: {aiStats.HP} | Shield: {aiStats.shield} | Aura: {aiStats.aura}
        </p>
        {/* AI Cards are hidden */}
        <div className="text-gray-400 text-sm italic">Cards are hidden</div>
      </div>

      {/* Battlefield */}
      <div className="border-t border-b py-4 text-center font-semibold">
        {currentTurn === 0 ? "Your Turn! Choose a card." : "AI is thinking..."}
      </div>

      {/* Player Field */}
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {playerStats.hand?.map((card, index) => {
          const isDisabled =
            playerStats.HP <= 0 || aiStats.HP <= 0 || currentTurn === 1;

          return (
            <button
              key={index}
              onClick={() => playCard(card)}
              disabled={isDisabled}
              className={`relative transition-transform ${
                isDisabled ? "opacity-40 cursor-not-allowed" : "hover:scale-105"
              }`}
              data-tooltip-id={`tooltip-${index}`}
              data-tooltip-content={
                card.special
                  ? `${card.special.name} (${card.special.type}) — ${
                      card.special.value ?? card.special.multiplier
                    }`
                  : "No special effect"
              }
            >
              <Card
                {...card}
                aura={playerStats.aura}
                specialReady={playerStats.aura >= card.cost}
              />
              <Tooltip id={`tooltip-${index}`} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
