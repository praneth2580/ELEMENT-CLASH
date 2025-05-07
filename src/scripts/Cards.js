// ========== Imports ==========
import default_logo from "../logo.svg";
import air1 from "../assets/img/air1.jpeg";
import air2 from "../assets/img/air2.jpeg";
import air3 from "../assets/img/air3.jpeg";
import air4 from "../assets/img/air4.jpeg";
import earth from "../assets/img/earth.jpeg";
import fire1 from "../assets/img/fire1.jpeg";
import fire2 from "../assets/img/fire2.jpeg";
import water1 from "../assets/img/water1.jpeg";
import water2 from "../assets/img/water2.jpeg";
import water3 from "../assets/img/water3.jpeg";

// ========== Static Definitions ==========

// --- Element Definitions with color classes ---
const elements = {
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
const types = {
  Attack: { color: "#FA4545", logo: default_logo },
  Defend: { color: "#6873EE", logo: default_logo },
  Heal: { color: "#3ad227", logo: default_logo },
};

// --- Special Type Definitions ---
const specialEffects = {
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
const rarities = {
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
const traits = [
  "Fierce",
  "Tactical",
  "Swift",
  "Resilient",
  "Mystic",
  "Strategic",
];

// --- Keyword Templates by Element and Type ---
const elementKeywords = {
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
const specialPrefixes = {
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
const traitsByRarity = {
  Common: [],
  Uncommon: [],
  Rare: ["Steady", "Cunning"],
  Epic: ["Fierce", "Unyielding"],
  Legendary: ["Mythic", "Ancient", "Divine"],
};

// ========== Derived Dynamic Constants ==========
const _elements = Object.keys(elements);
const _types = Object.keys(types);
const _specialTypes = Object.keys(specialEffects);
const _rarities = Object.keys(rarities);
const _traits = [...traits];

const _elementRatios = Object.fromEntries(
  _elements.map((el) => [el, elements[el].ratio])
);

const elementColors = Object.fromEntries(
  _elements.map((el) => [el, elements[el].colorClass])
);

const rarityColors = Object.fromEntries(
  _rarities.map((r) => [r, rarities[r].colorClass])
);

const rarityRatios = Object.fromEntries(
  _rarities.map((r) => [r, rarities[r].ratio])
);

const typeRatios = Object.fromEntries(
  _elements.map((el) => [el, elements[el].type_ratios])
);

const affinities = Object.fromEntries(
  _elements.map((el) => [el, elements[el].affinities])
);

// ========== Utility Functions ==========

// Helper: get a random item
function getRandomItem(arr, fallback = "Unknown") {
  if (!arr || arr.length === 0) return fallback;
  return arr[Math.floor(Math.random() * arr.length)];
}

const getCardRarity = ({ value, specialValue }) => {
  const rarityWeight = value + specialValue;
  if (rarityWeight <= 30) return "Common";
  if (rarityWeight <= 50) return "Uncommon";
  if (rarityWeight <= 70) return "Rare";
  if (rarityWeight <= 90) return "Epic";
  return "Legendary";
};

function getValidEffectsByRole(role) {
  return Object.entries(specialEffects)
    .filter(([_, effect]) => effect.playRole === role)
    .map(([key, effect]) => ({ key, ...effect }));
}

/**
 * Safely returns a single item from a list based on given ratio percentages.
 * If ratios are missing or all weights are zero, falls back to equal probability.
 * @param {string[]} list - Array of possible items (e.g., ["Attack", "Defend", "Heal"])
 * @param {Object} ratioMap - Object mapping each item to a percentage (e.g., { Attack: 60, Defend: 30, Heal: 10 })
 * @param {string} defaultValue - Value to return if the list is empty
 * @returns {string} - A randomly selected item based on weight or fallback
 */
const getWeightedRandomItem = (
  list,
  ratioMap = {},
  defaultValue = "Attack"
) => {
  if (!list || list.length === 0) {
    console.warn(
      "Empty list passed to getWeightedRandomItem, returning default value."
    );
    return defaultValue;
  }

  const weights = list.map((item) => ratioMap[item] || 0);
  const totalWeight = weights.reduce((sum, w) => sum + w, 0);

  if (totalWeight === 0) {
    // Fallback: Equal chance for all items
    return list[Math.floor(Math.random() * list.length)];
  }

  let rand = Math.random() * totalWeight;
  for (let i = 0; i < list.length; i++) {
    rand -= weights[i];
    if (rand <= 0) {
      return list[i];
    }
  }

  // Fallback (shouldn't hit this if weights are correct)
  return list[list.length - 1];
};

/**
 * Calculates a card's value (0–10) based on cost, type, and element.
 * @param {string} type - The card type (e.g., "Attack", "Defend", "Heal")
 * @param {string} element - The element (e.g., "Fire", "Water", etc.)
 * @returns {Object} A normalized value between 0 and 10
 */
const calculateValueAndCost = (element, type) => {
  const elementData = element;
  if (!elementData) throw new Error(`Unknown element: ${element}`);
  if (!elementData.value[type] || !elementData.cost_multiplier[type]) {
    throw new Error(
      `Missing value or cost multiplier for type: ${type} in ${element}`
    );
  }

  // Step 1: Pick value in the range defined for that element & type
  const [minValue, maxValue] = elementData.value[type];
  const value =
    Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;

  // Step 2: Calculate cost using inverse of cost multiplier
  const multiplier = elementData.cost_multiplier[type];
  let cost = value / multiplier;

  // Step 3: Clamp cost to 0–10 range and round
  cost = Math.round(Math.max(0, Math.min(10, cost)));

  return { value, cost };
};

/**
 * Determines the rarity of a card based on its type, element, value, and cost.
 * Internally computes a rarity score using value, cost, and type frequency.
 * @param {string} type - The card type (e.g., "Attack", "Defend", "Heal")
 * @param {string} element - The element (e.g., "Fire", "Water", etc.)
 * @param {number} value - The card's value (0–10)
 * @param {number} cost - The card's cost (0–10)
 * @returns {string} Rarity name (e.g., "Common", "Uncommon")
 */
// function determineRarity(type, element, value, cost) {
//   const elementData = element;

//   if (!elementData) return "Common";

//   const typeFrequency = elementData.type_ratios[type] || 0;

//   // Infrequent types make cards rarer, so we invert the frequency
//   const invertedFrequency = 100 - typeFrequency;

//   // Compute a normalized rarity score (0–100)
//   const rarityScore = value * 3 + cost * 2 + invertedFrequency;

//   // Find matching rarity range
//   const result = Object.entries(rarities).find(
//     ([, data]) => rarityScore >= data.min && rarityScore <= data.max
//   );

//   console.log("result?.[0] : ", rarityScore)

//   return result?.[0] || "Common";
// }

function determineRarity(cards, card) {
  const rarityRatios = {
    Common: 40,
    Uncommon: 30,
    Rare: 15,
    Epic: 10,
    Legendary: 5,
  };

  // Sort once by rarityScore (ascending)
  const sorted = [...cards].sort((a, b) => a.rarityScore - b.rarityScore);

  // Calculate index thresholds
  const total = sorted.length;
  const thresholds = {};
  let cumulative = 0;

  for (const [rarity, ratio] of Object.entries(rarityRatios)) {
    cumulative += ratio;
    thresholds[rarity] = Math.floor((cumulative / 100) * total);
  }

  // Find index of the card in sorted array
  const index = sorted.findIndex((c) => c === card);

  // Assign rarity based on index
  if (index < thresholds.Common) return "Common";
  if (index < thresholds.Uncommon) return "Uncommon";
  if (index < thresholds.Rare) return "Rare";
  if (index < thresholds.Epic) return "Epic";
  return "Legendary";
}

/**
 * Selects a special effect based on card rarity, element, and type.
 * @param {string} rarity - Rarity of the card (e.g., "Common", "Rare")
 * @param {string} element - Element of the card (e.g., "Fire", "Water")
 * @param {string} type - Type of the card (e.g., "Attack", "Defend", "Heal")
 * @returns {Object|null} A special effect object or null if none applicable
 */
function getSpecialEffectForCard(rarity, element, type) {
  // Weighting multipliers for rarity-based effect likelihood
  const rarityChances = {
    Common: 0.2,
    Uncommon: 0.4,
    Rare: 0.6,
    Epic: 0.8,
    Legendary: 1.0,
  };

  const chanceMultiplier = rarityChances[rarity] || 0.2;

  // Filter effects compatible with element and type
  const compatibleEffects = Object.entries(specialEffects).filter(
    ([_, effect]) =>
      effect.compatibleElements.includes(element) &&
      effect.compatibleTypes.includes(type)
  );

  if (compatibleEffects.length === 0) return null;

  // With some probability (based on rarity), return an effect
  const shouldApply = Math.random() < chanceMultiplier;

  if (!shouldApply) return null;

  // Pick one randomly
  const [effectName, effectData] =
    compatibleEffects[Math.floor(Math.random() * compatibleEffects.length)];

  // Assign random duration and value based on range
  const value = randomInRange(effectData.valueRange);
  const duration = randomInRange(effectData.durationRange);
  const special_type = effectData.type;

  return {
    name: effectName,
    type: special_type,
    value,
    duration,
  };
}

/**
 * Returns a random integer within a given range [min, max]
 * @param {number[]} range - Array of [min, max]
 * @returns {number}
 */
function randomInRange([min, max]) {
  if (min === max) return min;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate a card name
function generateCardName(element, type, rarity, special) {
  const keywordList = elementKeywords[element]?.[type];

  // Debug: Check if keyword list is valid
  if (!keywordList || keywordList.length === 0) {
    console.error(
      `No keywords found for element: ${element} and type: ${type}`
    );
    return "Unknown Card";
  }

  const keyword = getRandomItem(keywordList);

  const trait = getRandomItem(traitsByRarity[rarity], "");

  let prefix = "";
  if (special?.type && specialPrefixes[special.type]) {
    prefix = getRandomItem(specialPrefixes[special.type]);
  }

  let nameParts = [];
  if (prefix) nameParts.push(prefix);
  if (trait) nameParts.push(trait);
  nameParts.push(keyword);

  return nameParts.join(" ");
}

// ========== Card Generation ==========

const generateCard = (no_of_cards) => {

  if (!no_of_cards || no_of_cards <= 0) return [];

  const cards = Array.from({ length: no_of_cards }, getCardBasics); // Generate N random cards

  cards.forEach(card => {
    card.rarity = determineRarity(cards, card);
    card.special = getSpecialEffectForCard(card.rarity, card.element, card.type);
    card.trait = getRandomItem(_traits);
    card.name = generateCardName(card.element, card.type, card.rarity, card.special);
  });
  return cards;
};

const getCardBasics = () => {
  const element = getWeightedRandomItem(
    _elements,
    _elementRatios,
    _elements[0]
  );
  const element_data = elements[element];
  const typeRatio = typeRatios[element].type_ratios;

  const type = getWeightedRandomItem(_types, typeRatio, _types[0]);

  const { value, cost } = calculateValueAndCost(element_data, type);

  return {
    element,
    value,
    cost,
    type,
    affinity: element_data.affinities,
  };
};

// const generateCard = () => {
//   const element = getWeightedRandomItem(
//     _elements,
//     _elementRatios,
//     _elements[0]
//   );
//   const element_data = elements[element];
//   const typeRatio = typeRatios[element].type_ratios;

//   const type = getWeightedRandomItem(_types, typeRatio, _types[0]);

//   const { value, cost } = calculateValueAndCost(element_data, type);
//   const rarity = determineRarity(type, element_data, value, cost);

//   const special = getSpecialEffectForCard(rarity, element, type);
//   const trait = getRandomItem(_traits);

//   return {
//     name: generateCardName(element, type, rarity, special),
//     element,
//     value,
//     cost,
//     type,
//     special,
//     rarity,
//     trait: trait,
//     affinity: element_data.affinities,
//   };
// };

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

// ========== Exports ==========

const specialTypes = {
  attacker: [],
  defender: [],
};

export {
  elements,
  types,
  specialEffects,
  specialTypes,
  rarities,
  traits,
  affinities,
  specialPrefixes,
  elementKeywords,
  elementColors,
  rarityColors,
  rarityRatios,
  typeRatios,
  getRandomItem,
  getCardRarity,
  generateCard,
  getValidEffectsByRole,
};
