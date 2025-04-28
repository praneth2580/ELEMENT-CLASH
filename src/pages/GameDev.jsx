import React, { useEffect, useRef, useState } from "react";
import Player from "../scripts/Player";
import AI from "../scripts/Ai";

export default function GameDev() {
  const playerRef = useRef(null);
  const aiRef = useRef(null);

  const [playerStats, setPlayerStats] = useState({
    HP: 0,
    shield: 0,
    effects: [],
    hand: [],
    aura: 0,
    tacticalAura: 0
  });
  const [aiStats, setAiStats] = useState({
    HP: 0,
    shield: 0,
    effects: [],
    hand: [],
    aura: 0,
    tacticalAura: 0
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
    }, 2000);

    return () => clearTimeout(aiTurn);
  }, [currentTurn]);

  useEffect(() => {
    if (checkGameOver()) return;

    playerRef.current.addAura(1);
    aiRef.current.addAura(1);

    playerRef.current.applySpecial();
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
      setCurrentRound(prev => prev + 1);
    }
    setCurrentTurn(nextTurn);
  }

  function checkGameOver() {
    if (playerRef.current.HP <= 0 || aiRef.current.HP <= 0) {
      setMessage(`${playerRef.current.HP <= 0 ? "AI" : "Player"} has won the game!`);
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
      setMessage(`${attacker.constructor.name} attacked for ${card.value} damage!`);
    } else if (card.type.toLowerCase() === "heal") {
      attacker.heal(card.value);
      setMessage(`${attacker.constructor.name} healed for ${card.value} HP!`);
    } else if (card.type.toLowerCase() === "block") {
      attacker.setShield(card.value);
      setMessage(`${attacker.constructor.name} raised a shield of ${card.value}!`);
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
    <div className="max-w-7xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Player Section */}
        <div className="bg-blue-50 rounded-lg p-4 shadow-md flex flex-col gap-3">
          <h2 className="text-xl font-bold text-center">🧙 Player</h2>
          <div>❤️ HP: {playerStats.HP}</div>
          <div>🛡️ Shield: {playerStats.shield}</div>
          <div>🌟 Aura: {playerStats.aura}</div>
          <div>🌀 Tactical Aura: {playerStats.tacticalAura ?? 0}</div>

          <div className="mt-3">
            <h3 className="font-semibold text-sm mb-1">🎯 Effects</h3>
            <div className="bg-white rounded p-2 text-sm min-h-[60px]">
              {playerStats.effects.length > 0 ? (
                playerStats.effects.map((eff, i) => (
                  <div key={i}>
                    {eff.type} — {eff.value ?? eff.multiplier} ({eff.duration ?? "∞"})
                  </div>
                ))
              ) : (
                <div className="text-gray-500">None</div>
              )}
            </div>
          </div>

          <div className="mt-3">
            <h3 className="font-semibold text-sm mb-1">🃏 Hand</h3>
            <div className="bg-white rounded p-2 text-sm min-h-[60px]">
              {playerStats.hand.length > 0 ? (
                playerStats.hand.map((card, i) => (
                  <div key={i}>
                    {card.name} ({card.type}) — Cost: {card.cost} / Value: {card.value}
                  </div>
                ))
              ) : (
                <div className="text-gray-500">No cards</div>
              )}
            </div>
          </div>
        </div>

        {/* Center Section (Game Info) */}
        <div className="bg-white rounded-lg p-4 shadow-md flex flex-col items-center gap-4">
          <h1 className="text-2xl font-bold">⚡ Element Clash</h1>
          <div className="text-sm">Round: {currentRound}</div>
          <div className="text-sm">
            Turn: <strong>{currentTurn === 0 ? "Player" : "AI"}</strong>
          </div>
          <div className="text-center font-semibold">{message}</div>

          {/* Player action panel */}
          <div className="w-full flex flex-wrap justify-center gap-3 mt-4">
            {currentTurn === 0 &&
              playerStats.hand.map((card, idx) => (
                <button
                  key={idx}
                  onClick={() => playCard(card)}
                  className="bg-gray-100 hover:bg-gray-200 rounded p-3 text-sm w-32"
                  disabled={playerStats.HP <= 0 || aiStats.HP <= 0}
                >
                  <div className="font-bold">{card.name}</div>
                  <div>Type: {card.type}</div>
                  <div>Cost: {card.cost}</div>
                  <div>Value: {card.value}</div>
                  {card.special && (
                    <div className="italic text-xs mt-1">{card.special.name}</div>
                  )}
                </button>
              ))}
          </div>
        </div>

        {/* AI Section */}
        <div className="bg-red-50 rounded-lg p-4 shadow-md flex flex-col gap-3">
          <h2 className="text-xl font-bold text-center">🤖 AI</h2>
          <div>❤️ HP: {aiStats.HP}</div>
          <div>🛡️ Shield: {aiStats.shield}</div>
          <div>🌟 Aura: {aiStats.aura}</div>
          <div>🌀 Tactical Aura: {aiStats.tacticalAura ?? 0}</div>

          <div className="mt-3">
            <h3 className="font-semibold text-sm mb-1">🎯 Effects</h3>
            <div className="bg-white rounded p-2 text-sm min-h-[60px]">
              {aiStats.effects.length > 0 ? (
                aiStats.effects.map((eff, i) => (
                  <div key={i}>
                    {eff.type} — {eff.value ?? eff.multiplier} ({eff.duration ?? "∞"})
                  </div>
                ))
              ) : (
                <div className="text-gray-500">None</div>
              )}
            </div>
          </div>

          <div className="mt-3">
            <h3 className="font-semibold text-sm mb-1">🃏 Hand</h3>
            <div className="bg-white rounded p-2 text-sm min-h-[60px]">
              {aiStats.hand.length > 0 ? (
                aiStats.hand.map((card, i) => (
                  <div key={i}>
                    {card.name} ({card.type}) — Cost: {card.cost} / Value: {card.value}
                  </div>
                ))
              ) : (
                <div className="text-gray-500">No cards</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
