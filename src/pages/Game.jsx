import React, { useEffect, useRef, useState } from "react";
import { removeByIndexes } from "../functions";
import Player from "../scripts/Player";
import AI from "../scripts/Ai";

export default function Game() {
  const playerRef = useRef(null);
  const aiRef = useRef(null);

  const [playerStats, setPlayerStats] = useState({
    HP: 0,
    shield: 0,
    effects: [],
    hand: [],
    aura: 0
  });
  const [aiStats, setAiStats] = useState({
    HP: 0,
    shield: 0,
    effects: [],
    hand: [],
    aura: 0
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

  // TURN BASED AURA
  useEffect(() => {
    if (checkGameOver()) return;

    playerRef.current.addAura(1);
    playerRef.current.applySpecial()
    
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

    // Basic logic (expand as needed for special effects)
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

    // adding special effect of cards to entity
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
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
        {/* Player Debug - LEFT */}
        <div className="bg-blue-50 rounded-lg p-4 shadow-md">
          <h2 className="text-xl font-bold mb-2 text-center">🧙 Player</h2>
          <p className="text-sm">HP: {playerStats.HP}</p>
          <p className="text-sm">Shield: {playerStats.shield}</p>
          <p className="text-sm mb-2">Aura: {playerStats.aura}</p>

          <h3 className="font-semibold text-sm mt-4">Effects</h3>
          <ul className="text-sm bg-white rounded p-2 max-h-40 overflow-auto shadow-inner">
            {playerStats.effects.length > 0 ? (
              playerStats.effects.map((eff, i) => (
                <li key={i}>
                  {eff.type} – {eff.value ?? eff.multiplier} –{" "}
                  {eff.duration ?? "∞"}
                </li>
              ))
            ) : (
              <li className="text-gray-500">None</li>
            )}
          </ul>

          <h3 className="font-semibold text-sm mt-4">Hand</h3>
          <ul className="text-sm bg-white rounded p-2 max-h-40 overflow-auto shadow-inner">
            {playerStats.hand?.map((card, i) => (
              <li key={i}>
                {card.name} (Cost: {card.cost}, Dmg: {card.value})
              </li>
            ))}
          </ul>
        </div>

        {/* Game UI - CENTER */}
        <div className="bg-white rounded-lg p-4 shadow-md text-center">
          <h1 className="text-2xl font-bold mb-2">Element Clash</h1>
          <div className="text-sm mb-2">
            Round: {currentRound} | Turn:{" "}
            <strong>{currentTurn === 0 ? "Player" : "AI"}</strong>
          </div>
          <div className="mb-2 font-semibold">{message}</div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {currentTurn === 0 &&
              playerStats.hand &&
              playerStats.hand.map((card, index) => (
                <button
                  key={index}
                  onClick={() => playCard(card)}
                  disabled={playerStats.HP <= 0 || aiStats.HP <= 0}
                  className="p-3 border rounded bg-gray-100 hover:bg-gray-200 shadow"
                >
                  <div className="font-bold">{card.name}</div>
                  <div className="text-sm">Element: {card.element}</div>
                  <div className="text-sm">Type: {card.type}</div>
                  <div className="text-sm">Cost: {card.cost}</div>
                  <div className="text-sm">Damage: {card.value}</div>
                  <div className="text-xs italic">{card.special?.name}</div>
                </button>
              ))}
          </div>
        </div>

        {/* AI Debug - RIGHT */}
        <div className="bg-red-50 rounded-lg p-4 shadow-md">
          <h2 className="text-xl font-bold mb-2 text-center">🤖 AI</h2>
          <p className="text-sm">HP: {aiStats.HP}</p>
          <p className="text-sm">Shield: {aiStats.shield}</p>
          <p className="text-sm mb-2">Aura: {aiStats.aura}</p>

          <h3 className="font-semibold text-sm mt-4">Effects</h3>
          <ul className="text-sm bg-white rounded p-2 max-h-40 overflow-auto shadow-inner">
            {aiStats.effects.length > 0 ? (
              aiStats.effects.map((eff, i) => (
                <li key={i}>
                  {eff.type} – {eff.value ?? eff.multiplier} –{" "}
                  {eff.duration ?? "∞"}
                </li>
              ))
            ) : (
              <li className="text-gray-500">None</li>
            )}
          </ul>

          <h3 className="font-semibold text-sm mt-4">Hand</h3>
          <ul className="text-sm bg-white rounded p-2 max-h-40 overflow-auto shadow-inner">
            {aiStats.hand?.map((card, i) => (
              <li key={i}>
                {card.name} (Cost: {card.cost}, Dmg: {card.value})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
