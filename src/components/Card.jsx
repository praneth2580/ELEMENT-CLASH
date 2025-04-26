// components/Card.jsx
import React from "react";
import "../Card.css";

const rarityColors = {
  Common: "#777",
  Uncommon: "#4CAF50",
  Rare: "#2196F3",
  Epic: "#9C27B0",
  Legendary: "#FFD700",
};

const elementIcons = {
  Fire: "🔥",
  Water: "💧",
  Earth: "🌿",
  Air: "🌪️",
};

const typeIcons = {
  Attack: "⚔️",
  Defend: "🛡️",
  Heal: "❤️",
};

const specialIcons = {
  "damage-over-time": "🔥",
  heal: "❤️",
  buff: "✨",
  debuff: "☠️",
  block: "🛡️",
};

const Card = ({
  name,
  element,
  value,
  cost,
  type,
  special,
  rarity,
  aura,
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

      {/* <div className="aura-bar">
        <div
          className="aura-fill"
          style={{ width: `${(aura / 10) * 100}%` }}
        ></div>
      </div> */}
    </div>
  );
};

export default Card;
