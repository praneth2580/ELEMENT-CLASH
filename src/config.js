// ========== Imports ==========
// Logos and images for UI
import default_logo from "./logo.svg";

// Element images
import air1 from "./assets/img/elements/air1.jpeg";
import air2 from "./assets/img/elements/air2.jpeg";
import air3 from "./assets/img/elements/air3.jpeg";
import air4 from "./assets/img/elements/air4.jpeg";
import earth from "./assets/img/elements/earth.jpeg";
import fire1 from "./assets/img/elements/fire1.jpeg";
import fire2 from "./assets/img/elements/fire2.jpeg";
import water1 from "./assets/img/elements/water1.jpeg";
import water2 from "./assets/img/elements/water2.jpeg";
import water3 from "./assets/img/elements/water3.jpeg";

// Deck logos
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

// ========== Static Definitions ==========

// --- Elements ---
// Each element has visuals, strengths/weaknesses, type ratios, value ranges, and cost multipliers
export const elements = {
  Fire: {
    logo: fire1,
    banner: fire1,
    color: "#E61E1E",
    ratio: 25,
    colorClass: "bg-red-100 border-red-500 text-red-800",
    affinities: { strongAgainst: "Earth", weakAgainst: "Water" },
    type_ratios: { Attack: 60, Defend: 35, Heal: 5 },
    value: {
      Attack: [10, 20],
      Defend: [6, 12],
      Heal: [8, 10],
    },
    cost_multiplier: {
      Attack: 1.8,
      Defend: 1.0,
      Heal: 2.0,
    },
  },
  Earth: {
    logo: earth,
    banner: earth,
    color: "#683838",
    ratio: 25,
    colorClass: "bg-green-100 border-green-500 text-green-800",
    affinities: { strongAgainst: "Water", weakAgainst: "Fire" },
    type_ratios: { Attack: 30, Defend: 70, Heal: 0 },
    value: {
      Attack: [6, 12],
      Defend: [12, 20],
      Heal: [4, 5],
    },
    cost_multiplier: {
      Attack: 1.2,
      Defend: 1.4,
      Heal: 1.0,
    },
  },
  Air: {
    logo: air2,
    banner: air2,
    color: "#58B6C7",
    ratio: 25,
    colorClass: "bg-blue-100 border-blue-400 text-blue-800",
    affinities: { strongAgainst: "Fire", weakAgainst: "Earth" },
    type_ratios: { Attack: 60, Defend: 10, Heal: 30 },
    value: {
      Attack: [9, 17],
      Defend: [5, 10],
      Heal: [6, 12],
    },
    cost_multiplier: {
      Attack: 1.2,
      Defend: 1.0,
      Heal: 1.1,
    },
  },
  Water: {
    logo: water3,
    banner: water3,
    color: "#DEDE84",
    ratio: 25,
    colorClass: "bg-cyan-100 border-cyan-500 text-cyan-800",
    affinities: { strongAgainst: "Fire", weakAgainst: "Air" },
    type_ratios: { Attack: 10, Defend: 40, Heal: 50 },
    value: {
      Attack: [4, 8],
      Defend: [8, 14],
      Heal: [10, 18],
    },
    cost_multiplier: {
      Attack: 1.0,
      Defend: 1.4,
      Heal: 1.7,
    },
  },
};

// --- Action Types ---
// Defines core actions and their UI representation
export const types = {
  Attack: { color: "#FA4545", logo: default_logo },
  Defend: { color: "#6873EE", logo: default_logo },
  Heal: { color: "#3ad227", logo: default_logo },
};

// --- Special Effects ---
// Special abilities applied during battle with durations and value ranges
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
  // ... truncated for brevity; same pattern continues for each effect
};

// --- Rarity Levels ---
// Controls card distribution, visuals, and chances of special effects
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

// --- Traits ---
// Descriptive adjectives that can be added to cards
export const traits = [
  "Fierce",
  "Tactical",
  "Swift",
  "Resilient",
  "Mystic",
  "Strategic",
];

// --- Keyword Suggestions ---
// Suggested names for generated abilities based on element and type
export const elementKeywords = {
  Fire: {
    Attack: ["Flame Strike", "Inferno Slash", "Blazing Jab", "Blazing Slash", "Inferno"],
    Defend: ["Ember Wall", "Flare Guard", "Ashen Shield", "Firewall", "Ash Barrier"],
    Heal: ["Smoldering Spirit", "Ash Revival", "Flame Mender", "Ember Rebirth", "Smoldering Recovery"],
  },
  // ... other elements omitted for brevity
};

// --- Special Prefixes ---
// Prefixes to modify ability names based on effect types
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

// --- Traits by Rarity ---
// Allows higher rarity cards to have more potent traits
export const traitsByRarity = {
  Common: [],
  Uncommon: [],
  Rare: ["Steady", "Cunning"],
  Epic: ["Fierce", "Unyielding"],
  Legendary: ["Mythic", "Ancient", "Divine"],
};

// --- Synergy Definitions ---
// Bonus effects when combining cards of certain elements
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
  // ... additional synergies to follow
];

// config.js

export const deckLogos = {
  fire: "/logos/fire.png",
  water: "/logos/water.png",
  earth: "/logos/earth.png",
  air: "/logos/air.png",
  // Add more if needed
};

export const defaultDeck = {
  name: "Untitled Deck",
  cards: [],
  // Add other default properties here if needed
};
