// components/Card.jsx
import React from "react";
import "../Card.css";
import { elements, types } from "../scripts/Cards";

const costColor = "#F3A91E";
const durationColor = "#f31ec1";
const basicText = "#FFFFFF";
const basicBG = "#1A1919";
const basicCard = "#D9D9D929";

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

const CardOld = ({
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

const Card = ({ card }) => {
  const elementColor = elements[card.element].color;
  const typeColor = types[card.type].color;

  return (
    <div
      className="card"
      style={{
        border: "4px solid " + elementColor,
        backgroundColor: basicBG,
      }}
    >
      <div className="card-row">
        <div className="cost-container" style={{ backgroundColor: costColor }}>
          <p style={{ color: basicText }}>{card.cost}</p>
        </div>
        <div className="rarity-container" style={{ borderColor: basicText }}>
          <p style={{ color: basicText }}>{card.rarity.toUpperCase()}</p>
        </div>
        <div className="value-container" style={{ backgroundColor: typeColor }}>
          <p style={{ color: basicText }}>{card.value}</p>
        </div>
      </div>
      <div className="card-row" style={{ justifyContent: "center" }}>
        <img
          src={elements[card.element].logo}
          alt={card.element}
          style={{ borderColor: basicCard }}
          className="element-image"
        />
      </div>
      <div className="card-row" style={{ justifyContent: "center" }}>
        <p className="card-title" style={{ color: basicText }}>
          {card.name.replaceAll("_", " ")}
        </p>
      </div>
      <div
        className="card-row"
        style={{ justifyContent: "center", paddingBlock: ".3rem" }}
      >
        <p className="card-trait" style={{ color: basicText }}>
          {card.trait}
        </p>
      </div>
      <div className="card-row">
        <div className="card-strong-container">
          <p style={{ color: basicText }}>{card.affinity.strongAgainst}</p>
        </div>
        <div className="card-weak-container">
          <p style={{ color: basicText }}>{card.affinity.weakAgainst}</p>
        </div>
      </div>

      <div
        className="card-row special-card"
        style={{ backgroundColor: basicCard }}
      >
        {!card.special ? (
          <p className="no-special" style={{ color: basicText }}>
            No Special Effect
          </p>
        ) : (
          <>
            <div className="special-text-container">
              <p className="special-name" style={{ color: basicText }}>
                {card.special.name.toUpperCase().replaceAll("_", " ")}
              </p>
              <p className="special-type" style={{ color: basicText }}>
                {card.special.type.toUpperCase().replaceAll("_", " ")}
              </p>
            </div>
            <div className="special-detials-container">
              <div
                className="special-cost-container"
                style={{ backgroundColor: costColor }}
              >
                <p style={{ color: basicText }}>{card.cost}</p>
              </div>
              <div
                className="special-duration-container"
                style={{ backgroundColor: durationColor }}
              >
                <p style={{ color: basicText }}>{card.duration ? card.duration : "∞"}</p>
              </div>
              <div
                className="special-value-container"
                style={{ backgroundColor: typeColor }}
              >
                <p style={{ color: basicText }}>{card.value}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Card;
