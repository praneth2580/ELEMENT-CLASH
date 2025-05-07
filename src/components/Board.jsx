import React, { useState } from "react";
import Card from "./Card"; // Your Card component

export default function GameBoard({
  playerStats,
  aiStats,
  playerHand,
  playerDeck,
  onCardPlay,
  currentTurn,
  currentRound,
  message,
}) {
  const [draggingCard, setDraggingCard] = useState(null);

  function handleDragStart(card) {
    setDraggingCard(card);
  }

  function handleDrop(target) {
    if (draggingCard) {
      onCardPlay(draggingCard, target); // 👈 we'll explain "target" below
      setDraggingCard(null);
    }
  }

  function allowDrop(e) {
    e.preventDefault(); // 👈 necessary to allow drop
  }

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      {/* Message */}
      <div className="text-center space-y-1">
        <h1 className="text-3xl font-bold">⚡ Element Clash ⚡</h1>
        <p className="text-lg">{message}</p>
        <p className="text-sm text-gray-500">
          Round {currentRound} | Turn: {currentTurn === 0 ? "Player" : "AI"}
        </p>
      </div>

      {/* Board */}
      <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
        {/* AI Section */}
        <div className="flex flex-col items-center">
          <div className="text-xl font-semibold">🤖 AI</div>
          <div>HP: {aiStats.HP} | Shield: {aiStats.shield}</div>
          <div className="flex gap-2 mt-2">
            {/* AI Hand (only on desktop) */}
            {window.innerWidth > 768 && aiStats.hand?.map((_, idx) => (
              <div key={idx} className="w-16 h-24 bg-gray-400 rounded-md"></div>
            ))}
          </div>
        </div>

        {/* Slots */}
        <div className="flex flex-col gap-4 items-center">
          <div
            onDrop={() => handleDrop("normal")}
            onDragOver={allowDrop}
            className="w-48 h-32 bg-white border-4 border-dashed rounded-lg flex items-center justify-center text-gray-500"
          >
            Normal Play
          </div>
          <div
            onDrop={() => handleDrop("synergy")}
            onDragOver={allowDrop}
            className="w-48 h-32 bg-white border-4 border-dashed rounded-lg flex items-center justify-center text-purple-500"
          >
            Synergy Play
          </div>
        </div>

        {/* Player Section */}
        <div className="flex flex-col items-center">
          <div className="text-xl font-semibold">🧙 Player</div>
          <div>HP: {playerStats.HP} | Shield: {playerStats.shield}</div>
          <div className="flex flex-col mt-2 gap-1">
            <div>Aura: {playerStats.aura}</div>
            <div>Tactical Aura: {/* You can add tactical aura stat here */}</div>
          </div>
        </div>
      </div>

      {/* Player Hand */}
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        {playerHand?.map((card, idx) => (
          <div
            key={idx}
            draggable
            onDragStart={() => handleDragStart(card)}
            className="cursor-pointer"
          >
            <Card key={idx} card={card} />
          </div>
        ))}
      </div>

      {/* Deck Info */}
      <div className="fixed bottom-4 left-4 text-sm text-gray-600">
        Cards left: {playerDeck?.length ?? 0}
      </div>
    </div>
  );
}
