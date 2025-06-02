// ========== Imports ==========
import default_logo from "./logo.svg";
import air2 from "./assets/img/elements/air2.jpeg";
import earth from "./assets/img/elements/earth.jpeg";
import fire1 from "./assets/img/elements/fire1.jpeg";
import water3 from "./assets/img/elements/water3.jpeg";
import deck_air from "./assets/img/decks/air";
import deck_dragon from "./assets/img/decks/dragon";
import deck_eagle from "./assets/img/decks/eagle";
import deck_earth from "./assets/img/decks/earth";
import deck_fire from "./assets/img/decks/fire";
import deck_king from "./assets/img/decks/king";
import deck_lion from "./assets/img/decks/lion";
import deck_skull from "./assets/img/decks/skull";
import deck_snake from "./assets/img/decks/snake";
import deck_spear from "./assets/img/decks/spear";
import deck_sword from "./assets/img/decks/sword";
import deck_warrior from "./assets/img/decks/warrior";
import deck_water from "./assets/img/decks/water";

// ========== Game Rules Config ==========
export const gameConfig = {
  aura: {
    max: 10,
    start: 2,
    min: 0,
  },
  tacAura: {
    gainPerAction: {
      damage: 1,
      block: 1,
      heal: 1,
    },
    max: 10,
  },
};

// ========== Elements ==========
export const elements = {
  Fire: {
    logo: fire1,
    banner: fire1,
    color: "#E61E1E",
    ratio: 25,
    colorClass: "bg-red-100 border-red-500 text-red-800",
    affinities: { strongAgainst: "Earth", weakAgainst: "Water" },
    type_ratios: { Attack: 60, Defend: 35, Heal: 5 },
    value: { Attack: [10, 20], Defend: [6, 12], Heal: [8, 10] },
    cost_multiplier: { Attack: 0.8, Defend: 0.6, Heal: 0.9 }, // lower multipliers
  },
  Earth: {
    logo: earth,
    banner: earth,
    color: "#683838",
    ratio: 25,
    colorClass: "bg-green-100 border-green-500 text-green-800",
    affinities: { strongAgainst: "Water", weakAgainst: "Fire" },
    type_ratios: { Attack: 30, Defend: 70, Heal: 0 },
    value: { Attack: [6, 12], Defend: [12, 20], Heal: [4, 5] },
    cost_multiplier: { Attack: 0.7, Defend: 0.8, Heal: 0.5 },
  },
  Air: {
    logo: air2,
    banner: air2,
    color: "#58B6C7",
    ratio: 25,
    colorClass: "bg-blue-100 border-blue-400 text-blue-800",
    affinities: { strongAgainst: "Fire", weakAgainst: "Earth" },
    type_ratios: { Attack: 60, Defend: 10, Heal: 30 },
    value: { Attack: [9, 17], Defend: [5, 10], Heal: [6, 12] },
    cost_multiplier: { Attack: 0.7, Defend: 0.5, Heal: 0.6 },
  },
  Water: {
    logo: water3,
    banner: water3,
    color: "#DEDE84",
    ratio: 25,
    colorClass: "bg-cyan-100 border-cyan-500 text-cyan-800",
    affinities: { strongAgainst: "Fire", weakAgainst: "Air" },
    type_ratios: { Attack: 10, Defend: 40, Heal: 50 },
    value: { Attack: [4, 8], Defend: [8, 14], Heal: [10, 18] },
    cost_multiplier: { Attack: 0.6, Defend: 0.7, Heal: 0.8 },
  },
};

// ========== Action Types ==========
export const types = {
  Attack: { color: "#FA4545", logo: default_logo },
  Defend: { color: "#6873EE", logo: default_logo },
  Heal: { color: "#3ad227", logo: default_logo },
};

// ========== Rarity & Probability ==========
export const rarities = {
  Common: {
    color: "#000",
    logo: default_logo,
    colorClass: "text-gray-700",
    ratio: 50,
    min: 0,
    max: 19,
    specialChance: 0.5,
  },
  Uncommon: {
    color: "#000",
    logo: default_logo,
    colorClass: "text-green-700",
    ratio: 30,
    min: 20,
    max: 29,
    specialChance: 0.7,
  },
  Rare: {
    color: "#000",
    logo: default_logo,
    colorClass: "text-blue-700",
    ratio: 15,
    min: 30,
    max: 39,
    specialChance: 0.85,
  },
  Epic: {
    color: "#000",
    logo: default_logo,
    colorClass: "text-purple-700",
    ratio: 4,
    min: 40,
    max: 49,
    specialChance: 0.95,
  },
  Legendary: {
    color: "#000",
    logo: default_logo,
    colorClass: "text-yellow-600",
    ratio: 1,
    min: 50,
    max: Infinity,
    specialChance: 1.0,
  },
};

export const generationConfig = {
  rarityProbability: {
    Common: 0.5,
    Uncommon: 0.25,
    Rare: 0.15,
    Epic: 0.07,
    Legendary: 0.03,
  },
  rarityEffectBoost: {
    Common: 1.0,
    Uncommon: 1.2,
    Rare: 1.4,
    Epic: 1.7,
    Legendary: 2.0,
  },
  specialEffectProbabilityByType: {
    Attack: 0.4,
    Defend: 0.5,
    Heal: 0.6,
  },
};

// ========== Traits & Naming ==========
export const traits = [
  "Fierce",
  "Tactical",
  "Swift",
  "Resilient",
  "Mystic",
  "Strategic",
];

export const traitsByRarity = {
  Common: [],
  Uncommon: [],
  Rare: ["Steady", "Cunning"],
  Epic: ["Fierce", "Unyielding"],
  Legendary: ["Mythic", "Ancient", "Divine"],
};

export const elementKeywords = {
  Fire: {
    Attack: [
      "Flame Strike",
      "Inferno Slash",
      "Blazing Jab",
      "Blazing Slash",
      "Inferno",
    ],
    Defend: [
      "Ember Wall",
      "Flare Guard",
      "Ashen Shield",
      "Firewall",
      "Ash Barrier",
    ],
    Heal: [
      "Smoldering Spirit",
      "Ash Revival",
      "Flame Mender",
      "Ember Rebirth",
      "Smoldering Recovery",
    ],
  },
  Earth: {
    Attack: [
      "Stone Slam",
      "Terra Punch",
      "Boulder Bash",
      "Rock Smash",
      "Earthen Blow",
    ],
    Defend: [
      "Granite Guard",
      "Earth Wall",
      "Rock Shield",
      "Root Barrier",
      "Stone Skin",
    ],
    Heal: ["Soil Healing", "Nature's Touch", "Earthen Embrace"],
  },
  Air: {
    Attack: [
      "Cyclone Shot",
      "Wind Cutter",
      "Gale Slash",
      "Air Spike",
      "Sky Barrage",
    ],
    Defend: ["Wind Cloak", "Breeze Barrier", "Air Shield"],
    Heal: ["Breath of Life", "Sky Restoration", "Airborne Heal"],
  },
  Water: {
    Attack: ["Frosted Strike", "Tidal Surge", "Aqua Blade", "Wave Crash"],
    Defend: ["Mist Guard", "Tide Barrier", "Bubble Guard", "Ice Shell"],
    Heal: [
      "Ocean’s Embrace",
      "Rainfall Blessing",
      "Healing Rain",
      "Soothing Stream",
    ],
  },
};

export const specialPrefixes = {
  burn: ["Burning", "Scorching"],
  freeze: ["Freezing", "Icy"],
  poison: ["Toxic", "Venomous"],
  heal: ["Restoring", "Blessed", "Healing", "Mending"],
  buff: ["Empowered", "Mystic", "Energized", "Blessed"],
  debuff: ["Cursed", "Weakened", "Corrupting"],
  block: ["Shielded", "Guarded", "Fortified"],
  "damage-over-time": ["Burning", "Venomous", "Lingering"],
};

// ========== Special Effects ==========
export const specialEffects = {
  burn: {
    logo: default_logo,
    type: "damage-over-time",
    appliesTo: "defender",
    compatibleElements: ["Fire"],
    compatibleTypes: ["Attack"],
    durationRange: [2, 4],
    valueRange: [1, 3],
  },
  ignite: {
    logo: default_logo,
    type: "buff",
    appliesTo: "attacker",
    compatibleElements: ["Fire"],
    compatibleTypes: ["Attack"],
    durationRange: [1, 2],
    valueRange: [1, 2],
  },
};

// ========== Synergies ==========
export const synergies = [
  {
    elements: ["fire", "air"],
    name: "Blazing Gale",
    upgradeEffect: { damageMultiplier: 1.5, effect: "burn" },
    downgradeEffect: { damageMultiplier: 1.2 },
  },
  {
    elements: ["water", "earth"],
    name: "Mud Shield",
    upgradeEffect: { block: 30, healOverTime: 10 },
    downgradeEffect: { block: 15 },
  },
];

// ========== Deck Defaults ==========
export const deckLogos = {
  air: deck_air,
  dragon: deck_dragon,
  eagle: deck_eagle,
  earth: deck_earth,
  fire: deck_fire,
  king: deck_king,
  lion: deck_lion,
  skull: deck_skull,
  snake: deck_snake,
  spear: deck_spear,
  sword: deck_sword,
  warrior: deck_warrior,
  water: deck_water,
};

export const defaultDeck = {
  name: "Untitled Deck",
  type: "air",
  fg_color: "#ffffff",
  bg_color: "#000000",
  cards: [],
};
