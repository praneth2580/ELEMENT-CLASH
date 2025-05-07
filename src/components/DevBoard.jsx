import React from "react";

const DevCard = ({ card, onClick, disabled }) => {
  const handleClick = () => {
    if (disabled) return;
    onClick(card);
  };

  {
    /* <button
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
</button> */
  }

  return (
    <div
      onClick={handleClick}
      className="bg-gray-700 hover:bg-gray-600 rounded p-3 text-sm"
    >
      <p className="text-md font-bold uppercase text-center">{card.name}</p>
      <div className="flex flex-row justify-between gap-1">
        <p className="text-sm text-center font-bold">{card.type}</p>
        <p className="text-sm text-center">
          ${card.cost} - {card.value}
        </p>
      </div>
      <div className="flex flex-row justify-between gap-1">
        {card.special ? (
          <>
            <p className="text-sm text-center font-bold">
              {card.special?.type}
            </p>
            <p className="text-sm text-center">
              ${card.special?.cost} - {card.special?.value}
            </p>
          </>
        ) : (
          <p className="text-xs text-center w-full">No Special Effects</p>
        )}
      </div>
    </div>
  );
};

const EntityDetails = ({ entity, name = "Player", bgColor = "blue" }) => {
  console.log(entity.entity);
  return (
    <div className={"bg-" + bgColor + "-800 rounded-lg p-4 shadow-md"}>
      <h2 className="text-xl font-bold text-center">{name}</h2>
      <div className="grid grid-cols-4 p-1 rounded-sm bg-slate-800 mt-2 grid-rows-2 gap-1">
        <div className="font-bold text-sm text-center bg-black-800">HP</div>
        <div className="font-bold text-sm text-center">SHIELD</div>
        <div className="font-bold text-sm text-center">AURA</div>
        <div className="font-bold text-sm text-center">TAC AURA</div>
        <div className="text-center">{entity.HP}</div>
        <div className="text-center">{entity.shield}</div>
        <div className="text-center">{entity.aura}</div>
        <div className="text-center">{entity.tac_aura}</div>
      </div>
      <div className="mt-3 flex flex-row flex-wrap gap-1">
        <div className="flex-1">
          <h3 className="font-semibold text-sm mb-1">🎯 Effects</h3>
          <div className="bg-gray-800 rounded p-2 text-sm">
            {entity.effects.length > 0 ? (
              entity.effects.map((eff, i) => (
                <div className="bg-slate-600 p-1 rounded" key={i}>
                  <h6 className="text-sm font-bold">{eff.type}</h6>
                  <p className="text-xs">
                    ${eff.duration ?? "∞"} - {eff.value ?? eff.multiplier}
                  </p>
                </div>
              ))
            ) : (
              <div className="text-gray-500">None</div>
            )}
          </div>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-sm mb-1">🃏 Hand</h3>
          <div className="bg-gray-800 rounded p-2 text-sm flex flex-col gap-1">
            {entity.hand.length > 0 ? (
              entity.hand.map((card, i) => (
                <div className="bg-slate-600 p-1 rounded" key={i}>
                  <h6 className="text-sm font-bold">{card.name}</h6>
                  <p className="text-xs">
                    {card.type} - ${card.cost} / {card.value}
                  </p>
                </div>
              ))
            ) : (
              <div className="text-gray-500">No cards</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const DevBoard = ({
  playerStats,
  aiStats,
  currentRound,
  currentTurn,
  message,
  playCard,
}) => {
  const abs = (
    <div className="max-w-7xl mx-auto p-4 bg-gray-900 text-white"></div>
  );

  console.log("AAA", playerStats);
  return (
    <div className="max-w-7xl mx-auto p-4 bg-gray-900 text-white">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Player Section */}
        <EntityDetails entity={playerStats} />

        {/* Center Section (Game Info) */}
        <div className="bg-gray-800 rounded-lg p-4 shadow-md flex flex-col items-center gap-4 ">
          {/* <h1 className="text-2xl font-bold">⚡ Element Clash</h1> */}
          <div className="flex flex-row justify-between gap-1 w-full">
            <div className="text-sm">
              {currentTurn === 0 ? "Player" : "AI"} [{currentRound}]
            </div>
            <div className="text-center font-semibold">{message}</div>
          </div>

          {/* Player action panel */}
          <div className="w-full grid grid-cols-3 gap-1">
            {currentTurn === 0
              ? playerStats.hand.map((card, idx) => (
                  <DevCard
                    card={card}
                    onClick={playCard}
                    disabled={playerStats.HP <= 0 || aiStats.HP <= 0}
                  />
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
        <EntityDetails entity={aiStats} bgColor="red" name="AI" />
      </div>
    </div>
  );
};

export default DevBoard;
