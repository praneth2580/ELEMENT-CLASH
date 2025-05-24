// ========== Imports ==========
import default_logo from "./logo.svg";
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

// --- Element Definitions with color classes ---
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
      Attack: [10, 20], // Fire specializes in strong attacks
      Defend: [6, 12], // Moderate defense
      Heal: [8, 10], // Rare = stronger heal
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
      Attack: [6, 12], // Lower attack
      Defend: [12, 20], // Earth is tanky
      Heal: [4, 5], // Practically unused
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
      Attack: [9, 17], // Agile, decent attacks
      Defend: [5, 10], // Rare = slightly stronger defense
      Heal: [6, 12], // Good healing ability
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
      Attack: [4, 8], // Weak attacks
      Defend: [8, 14], // Moderate defense
      Heal: [10, 18], // Water specializes in healing
    },
    cost_multiplier: {
      Attack: 1.0,
      Defend: 1.4,
      Heal: 1.7,
    },
  },
};

// --- Type Definitions ---
export const types = {
  Attack: { color: "#FA4545", logo: default_logo },
  Defend: { color: "#6873EE", logo: default_logo },
  Heal: { color: "#3ad227", logo: default_logo },
};

// --- Special Type Definitions ---
export const specialEffects = {
  burn: {
    logo: default_logo,
    type: "damage-over-time",
    appliesTo: "defender", // target
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
    valueRange: [1, 2], // extra damage
  },
  soak: {
    logo: default_logo,
    type: "debuff",
    appliesTo: "defender",
    compatibleElements: ["Water"],
    compatibleTypes: ["Attack"],
    durationRange: [2, 3],
    valueRange: [1, 2], // reduces attack effectiveness
  },
  regeneration: {
    logo: default_logo,
    type: "heal-over-time",
    appliesTo: "attacker",
    compatibleElements: ["Water", "Air"],
    compatibleTypes: ["Heal"],
    durationRange: [2, 4],
    valueRange: [1, 3],
  },
  stone_skin: {
    logo: default_logo,
    type: "block",
    appliesTo: "attacker",
    compatibleElements: ["Earth"],
    compatibleTypes: ["Defend"],
    durationRange: [1, 3],
    valueRange: [2, 5],
  },
  root: {
    logo: default_logo,
    type: "debuff",
    appliesTo: "defender",
    compatibleElements: ["Earth"],
    compatibleTypes: ["Defend"],
    durationRange: [2, 4],
    valueRange: [1, 2],
  },
  gust_boost: {
    logo: default_logo,
    type: "buff",
    appliesTo: "attacker",
    compatibleElements: ["Air"],
    compatibleTypes: ["Attack"],
    durationRange: [1, 2],
    valueRange: [2, 3],
  },
  evade: {
    logo: default_logo,
    type: "block",
    appliesTo: "attacker",
    compatibleElements: ["Air"],
    compatibleTypes: ["Defend"],
    durationRange: [1, 1],
    valueRange: [100], // chance to dodge next attack
  },
  wet_armor: {
    logo: default_logo,
    type: "block",
    appliesTo: "defender",
    compatibleElements: ["Water"],
    compatibleTypes: ["Defend"],
    durationRange: [1, 2],
    valueRange: [2, 3],
  },
  flare: {
    logo: default_logo,
    type: "buff",
    appliesTo: "attacker",
    compatibleElements: ["Fire"],
    compatibleTypes: ["Heal", "Attack"],
    durationRange: [1, 2],
    valueRange: [2, 4],
  },
  quake: {
    logo: default_logo,
    type: "damage-over-time",
    appliesTo: "defender",
    compatibleElements: ["Earth"],
    compatibleTypes: ["Attack"],
    durationRange: [2, 3],
    valueRange: [2, 4],
  },
  refresh: {
    logo: default_logo,
    type: "heal",
    appliesTo: "attacker",
    compatibleElements: ["Water"],
    compatibleTypes: ["Heal"],
    durationRange: [0, 0],
    valueRange: [5, 8],
  },
  wind_blind: {
    logo: default_logo,
    type: "debuff",
    appliesTo: "defender",
    compatibleElements: ["Air"],
    compatibleTypes: ["Attack"],
    durationRange: [1, 2],
    valueRange: [1, 2],
  },
  harden: {
    logo: default_logo,
    type: "buff",
    appliesTo: "attacker",
    compatibleElements: ["Earth"],
    compatibleTypes: ["Defend"],
    durationRange: [2, 3],
    valueRange: [1, 2],
  },
};

// --- Rarity Definitions with ratios and color classes ---
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
    max: Infinity, // You can adjust this upper limit as needed
    specialChance: 1.0,
  },
};

// --- Trait List ---
export const traits = [
  "Fierce",
  "Tactical",
  "Swift",
  "Resilient",
  "Mystic",
  "Strategic",
];

// --- Keyword Templates by Element and Type ---
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
    Attack: ["Stone Slam", "Boulder Bash", "Terra Punch"],
    Defend: ["Rock Shield", "Earth Wall", "Granite Guard"],
    Heal: ["Earthen Embrace", "Nature's Touch", "Soil Healing"],
  },
  Air: {
    Attack: ["Gale Slash", "Wind Cutter", "Cyclone Shot"],
    Defend: ["Wind Cloak", "Breeze Barrier", "Feather Guard"],
    Heal: ["Breath of Life", "Sky Restoration", "Airborne Heal"],
  },
  Water: {
    Attack: [
      "Wave Crash",
      "Tide Jab",
      "Frosted Strike",
      "Tidal Surge",
      "Aqua Blade",
    ],
    Defend: [
      "Tide Barrier",
      "Ice Shell",
      "Mist Guard",
      "Wave Shield",
      "Bubble Guard",
    ],
    Heal: [
      "Soothing Stream",
      "Rainfall Blessing",
      "Aqua Recovery",
      "Healing Rain",
      "Ocean’s Embrace",
    ],
  },
};

// --- Special Prefixes per Special Type ---
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

// Traits by rarity
export const traitsByRarity = {
  Common: [],
  Uncommon: [],
  Rare: ["Steady", "Cunning"],
  Epic: ["Fierce", "Unyielding"],
  Legendary: ["Mythic", "Ancient", "Divine"],
};

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
  {
    elements: ["air", "earth"],
    name: "Dust Cyclone",
    upgradeEffect: { damage: 25, debuff: "accuracy-down" },
    downgradeEffect: { damage: 15 },
  },
  {
    elements: ["fire", "earth"],
    name: "Magma Surge",
    upgradeEffect: { damageOverTime: 20, shieldBreak: true },
    downgradeEffect: { damageOverTime: 10 },
  },
  {
    elements: ["water", "fire"],
    name: "Steam Burst",
    upgradeEffect: { aoeDamage: 20, debuff: "vision-obscure" },
    downgradeEffect: { aoeDamage: 10 },
  },
  {
    elements: ["earth", "water"],
    name: "Crystal Growth",
    upgradeEffect: { heal: 30, auraRegen: 5 },
    downgradeEffect: { heal: 15 },
  },
  {
    elements: ["air", "fire"],
    name: "Scorched Winds",
    upgradeEffect: { damage: 40, burn: true },
    downgradeEffect: { damage: 25 },
  },
  {
    elements: ["water", "air"],
    name: "Mist Veil",
    upgradeEffect: { evade: true, healOverTime: 15 },
    downgradeEffect: { evadeChance: 50 },
  },
  {
    elements: ["earth", "air"],
    name: "Stone Wind",
    upgradeEffect: { shield: 25, block: 15 },
    downgradeEffect: { block: 10 },
  },
  {
    elements: ["fire", "water"],
    name: "Boil Blast",
    upgradeEffect: { damage: 35, dot: 10 },
    downgradeEffect: { damage: 20 },
  },
  {
    elements: ["fire", "fire"],
    name: "Inferno Drive",
    upgradeEffect: { damageMultiplier: 2.0 },
    downgradeEffect: { damageMultiplier: 1.3 },
  },
  {
    elements: ["water", "water"],
    name: "Aqua Harmony",
    upgradeEffect: { heal: 40, cleanse: true },
    downgradeEffect: { heal: 20 },
  },
  {
    elements: ["earth", "earth"],
    name: "Rock Bulwark",
    upgradeEffect: { block: 40, damageReturn: 10 },
    downgradeEffect: { block: 20 },
  },
  {
    elements: ["air", "air"],
    name: "Tempest Dance",
    upgradeEffect: { doubleTurn: true },
    downgradeEffect: { speedBoost: 10 },
  },
  {
    elements: ["fire", "earth"],
    name: "Flame Armor",
    upgradeEffect: { block: 20, reflect: 10 },
    downgradeEffect: { block: 10 },
  },
  {
    elements: ["water", "air"],
    name: "Frozen Breath",
    upgradeEffect: { freezeChance: 40 },
    downgradeEffect: { slow: true },
  },
  {
    elements: ["earth", "fire"],
    name: "Charcoal Crush",
    upgradeEffect: { shieldBreak: true, damage: 30 },
    downgradeEffect: { damage: 15 },
  },
  {
    elements: ["air", "water"],
    name: "Thundercloud",
    upgradeEffect: { stun: true, aoeDamage: 15 },
    downgradeEffect: { aoeDamage: 10 },
  },
  {
    elements: ["earth", "air"],
    name: "Sand Storm",
    upgradeEffect: { damageOverTime: 15, blind: true },
    downgradeEffect: { damageOverTime: 10 },
  },
  {
    elements: ["fire", "water"],
    name: "Smokescreen",
    upgradeEffect: { dodge: true, enemyAccuracyDown: true },
    downgradeEffect: { dodgeChance: 30 },
  },
];

export const deckLogos = {
  "Air" : deck_air,
  "Dragon" : deck_dragon,
  "Eagle" : deck_eagle,
  "Earth" : deck_earth,
  "Fire" : deck_fire,
  "King" : deck_king,
  "Lion" : deck_lion,
  "Skull" : deck_skull,
  "Snake" : deck_snake,
  "Spear" : deck_spear,
  "Sword" : deck_sword,
  "Warrior" : deck_warrior,
  "Water" : deck_water
}
