// components/Card.jsx
import React from "react";
import "../Card.css";

// Color mappings for different rarities
const rarityColors = {
  Common: "#777",
  Uncommon: "#4CAF50",
  Rare: "#2196F3",
  Epic: "#9C27B0",
  Legendary: "#FFD700",
};

// Icons for elements
const elementIcons = {
  Fire: "🔥",
  Water: "💧",
  Earth: "🌿",
  Air: "🌪️",
};

// Icons for card types
const typeIcons = {
  Attack: "⚔️",
  Defend: "🛡️",
  Heal: "❤️",
};

// Icons for special effects
const specialIcons = {
  "damage-over-time": "🔥",
  heal: "❤️",
  buff: "✨",
  debuff: "☠️",
  block: "🛡️",
};

// Symbols for traits
const traitSymbols = {
  Resilient: "🛡️",
  Powerful: "💪",
  Agile: "🏃‍♂️",
  Cunning: "🧠",
  Defensive: "🛡️",
};

// Symbols for affinities (with colors or icons)
const affinitySymbols = {
  Fire: {
    strongAgainst: { symbol: "🌪️", color: "#FF6347" }, // Air (strong) - red
    weakAgainst: { symbol: "💧", color: "#00BFFF" }, // Water (weak) - blue
  },
  Water: {
    strongAgainst: { symbol: "🔥", color: "#FF6347" }, // Fire (strong) - red
    weakAgainst: { symbol: "🌿", color: "#32CD32" }, // Earth (weak) - green
  },
  Earth: {
    strongAgainst: { symbol: "💧", color: "#00BFFF" }, // Water (strong) - blue
    weakAgainst: { symbol: "🌪️", color: "#FF6347" }, // Air (weak) - red
  },
  Air: {
    strongAgainst: { symbol: "🌿", color: "#32CD32" }, // Earth (strong) - green
    weakAgainst: { symbol: "🔥", color: "#FF6347" }, // Fire (weak) - red
  },
};

const Card = ({
  name,
  element,
  value,
  cost,
  type,
  special,
  rarity,
  trait,
  affinity,
  specialReady,
}) => {
  return (
    <div
      className={`card ${element.toLowerCase()} ${
        specialReady ? "special-ready" : ""
      }`}
      style={{ boxShadow: `0 0 8px 2px ${rarityColors[rarity]}` }}
    >
      <div className="card-header">
        <div className="element-icon">{elementIcons[element]}</div>
        <div className="element-label">{element}</div>
      </div>

      <div className="card-name">{name}</div>

      <div className="card-art">{/* Placeholder for card artwork */}</div>

      <div className="card-info">
        <div className="card-type">
          {type} {typeIcons[type]}
        </div>
        <div className="card-value">{value}</div>
      </div>

      <div className="card-cost-special">
        <div className="aura-cost">🌟 {cost}</div>
        <div className="special-effect">
          {specialIcons[special.type]} {special.name}
        </div>
      </div>

      {/* Trait Display - show symbol based on trait */}
      <div className="card-trait">
        {traitSymbols[trait]} {/* Displaying trait symbol */}
      </div>

      {/* Affinity Display - show strong and weak affinity symbols with colors */}
      <div className="card-affinity">
        <div
          className="affinity-strong"
          style={{ color: affinitySymbols[element].strongAgainst.color }}
        >
          {affinitySymbols[element].strongAgainst.symbol}
        </div>
        <div
          className="affinity-weak"
          style={{ color: affinitySymbols[element].weakAgainst.color }}
        >
          {affinitySymbols[element].weakAgainst.symbol}
        </div>
      </div>
    </div>
  );
};

export default Card;
