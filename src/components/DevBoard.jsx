import React from "react";

const DevBoard = ({
  playerStats,
  aiStats,
  currentRound,
  currentTurn,
  message,
  playCard,
}) => {
  return (
    <div className="max-w-7xl mx-auto p-4 bg-gray-900 text-white">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Player Section */}
        <div className="bg-blue-800 rounded-lg p-4 shadow-md flex flex-col gap-3">
          <h2 className="text-xl font-bold text-center">🧙 Player</h2>
          <div>❤️ HP: {playerStats.HP}</div>
          <div>🛡️ Shield: {playerStats.shield}</div>
          <div>🌟 Aura: {playerStats.aura}</div>
          <div>🌀 Tactical Aura: {playerStats.tac_aura ?? 0}</div>

          <div className="mt-3">
            <h3 className="font-semibold text-sm mb-1">🎯 Effects</h3>
            <div className="bg-gray-800 rounded p-2 text-sm min-h-[60px]">
              {playerStats.effects.length > 0 ? (
                playerStats.effects.map((eff, i) => (
                  <div key={i}>
                    {eff.type} — {eff.value ?? eff.multiplier} (
                    {eff.duration ?? "∞"})
                  </div>
                ))
              ) : (
                <div className="text-gray-500">None</div>
              )}
            </div>
          </div>

          <div className="mt-3">
            <h3 className="font-semibold text-sm mb-1">🃏 Hand</h3>
            <div className="bg-gray-800 rounded p-2 text-sm min-h-[60px]">
              {playerStats.hand.length > 0 ? (
                playerStats.hand.map((card, i) => (
                  <div key={i}>
                    {card.name} ({card.type}) — Cost: {card.cost} / Value:{" "}
                    {card.value}
                  </div>
                ))
              ) : (
                <div className="text-gray-500">No cards</div>
              )}
            </div>
          </div>
        </div>

        {/* Center Section (Game Info) */}
        <div className="bg-gray-800 rounded-lg p-4 shadow-md flex flex-col items-center gap-4">
          <h1 className="text-2xl font-bold">⚡ Element Clash</h1>
          <div className="text-sm">Round: {currentRound}</div>
          <div className="text-sm">
            Turn: <strong>{currentTurn === 0 ? "Player" : "AI"}</strong>
          </div>
          <div className="text-center font-semibold">{message}</div>

          {/* Player action panel */}
          <div className="w-full flex flex-wrap justify-center gap-3 mt-4">
            {currentTurn === 0
              ? playerStats.hand.map((card, idx) => (
                  <button
                    key={idx}
                    onClick={() => playCard(card)}
                    className="bg-gray-700 hover:bg-gray-600 rounded p-3 text-sm w-32"
                    disabled={playerStats.HP <= 0 || aiStats.HP <= 0}
                  >
                    <div className="font-bold">{card.name}</div>
                    <div>Type: {card.type}</div>
                    <div>Cost: {card.cost}</div>
                    <div>Value: {card.value}</div>
                    {card.special && (
                      <div className="italic text-xs mt-1">
                        {card.special.name}
                      </div>
                    )}
                  </button>
                ))
              : aiStats.hand.map((card, idx) => (
                  <button
                    key={idx}
                    onClick={() => playCard(card)}
                    className="bg-gray-700 hover:bg-gray-600 rounded p-3 text-sm w-32"
                    disabled={playerStats.HP <= 0 || aiStats.HP <= 0}
                  >
                    <div className="font-bold">{card.name}</div>
                    <div>Type: {card.type}</div>
                    <div>Cost: {card.cost}</div>
                    <div>Value: {card.value}</div>
                    {card.special && (
                      <div className="italic text-xs mt-1">
                        {card.special.name}
                      </div>
                    )}
                  </button>
                ))}
          </div>
        </div>

        {/* AI Section */}
        <div className="bg-red-800 rounded-lg p-4 shadow-md flex flex-col gap-3">
          <h2 className="text-xl font-bold text-center">🤖 AI</h2>
          <div>❤️ HP: {aiStats.HP}</div>
          <div>🛡️ Shield: {aiStats.shield}</div>
          <div>🌟 Aura: {aiStats.aura}</div>
          <div>🌀 Tactical Aura: {aiStats.tac_aura ?? 0}</div>

          <div className="mt-3">
            <h3 className="font-semibold text-sm mb-1">🎯 Effects</h3>
            <div className="bg-gray-800 rounded p-2 text-sm min-h-[60px]">
              {aiStats.effects.length > 0 ? (
                aiStats.effects.map((eff, i) => (
                  <div key={i}>
                    {eff.type} — {eff.value ?? eff.multiplier} (
                    {eff.duration ?? "∞"})
                  </div>
                ))
              ) : (
                <div className="text-gray-500">None</div>
              )}
            </div>
          </div>

          <div className="mt-3">
            <h3 className="font-semibold text-sm mb-1">🃏 Hand</h3>
            <div className="bg-gray-800 rounded p-2 text-sm min-h-[60px]">
              {aiStats.hand.length > 0 ? (
                aiStats.hand.map((card, i) => (
                  <div key={i}>
                    {card.name} ({card.type}) — Cost: {card.cost} / Value:{" "}
                    {card.value}
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
};

export default DevBoard;
