const elements = ["Fire", "Earth", "Air", "Water"];
const types = ["Attack", "Defend", "Heal"];
const specialTypes = {
  attacker: ["block", "heal", "buff"],
  defender: ["damage-over-time", "debuff"]
};
const rarities = ["Common", "Uncommon", "Rare", "Epic", "Legendary"];
const traits = [
  "Fierce",
  "Tactical",
  "Swift",
  "Resilient",
  "Mystic",
  "Strategic",
];
const affinities = {
  Fire: { strongAgainst: "Earth", weakAgainst: "Water" },
  Earth: { strongAgainst: "Water", weakAgainst: "Fire" },
  Air: { strongAgainst: "Fire", weakAgainst: "Earth" },
  Water: { strongAgainst: "Fire", weakAgainst: "Air" },
};

const _elements = ["Fire", "Earth", "Air", "Water"];
const _types = ["Attack", "Defend", "Heal"];
const _specialTypes = [...specialTypes.attacker, ...specialTypes.defender];
const _rarities = ["Common", "Uncommon", "Rare", "Epic", "Legendary"];
const _traits = [
  "Fierce",
  "Tactical",
  "Swift",
  "Resilient",
  "Mystic",
  "Strategic",
];
const _affinities = {
  Fire: { strongAgainst: "Earth", weakAgainst: "Water" },
  Earth: { strongAgainst: "Water", weakAgainst: "Fire" },
  Air: { strongAgainst: "Fire", weakAgainst: "Earth" },
  Water: { strongAgainst: "Fire", weakAgainst: "Air" },
};

const specialPrefixes = {
  block: ["Shielded", "Guarded", "Fortified"],
  heal: ["Restoring", "Healing", "Mending"],
  "damage-over-time": ["Burning", "Venomous", "Lingering"],
  buff: ["Empowered", "Energized", "Blessed"],
  debuff: ["Cursed", "Weakened", "Corrupting"],
};

const elementKeywords = {
  Fire: {
    Attack: ["Flame Strike", "Inferno Slash", "Blazing Jab"],
    Defend: ["Ember Wall", "Flare Guard", "Ashen Shield"],
    Heal: ["Smoldering Spirit", "Ash Revival", "Flame Mender"],
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
    Attack: ["Wave Crash", "Tide Jab", "Frosted Strike"],
    Defend: ["Tide Barrier", "Ice Shell", "Mist Guard"],
    Heal: ["Soothing Stream", "Rainfall Blessing", "Aqua Recovery"],
  },
};

const elementColors = {
  Fire: "bg-red-100 border-red-500 text-red-800",
  Earth: "bg-green-100 border-green-500 text-green-800",
  Air: "bg-blue-100 border-blue-400 text-blue-800",
  Water: "bg-cyan-100 border-cyan-500 text-cyan-800",
};

const rarityColors = {
  Common: "text-gray-700",
  Uncommon: "text-green-700",
  Rare: "text-blue-700",
  Epic: "text-purple-700",
  Legendary: "text-yellow-600",
};

// Fixed ratio for rarities (percentage based distribution)
const rarityRatios = {
  Common: 50,
  Uncommon: 30,
  Rare: 15,
  Epic: 4,
  Legendary: 1,
};

// Fixed ratio for types per element
const typeRatios = {
  Fire: { Attack: 50, Defend: 30, Heal: 20 },
  Earth: { Attack: 40, Defend: 40, Heal: 20 },
  Air: { Attack: 40, Defend: 40, Heal: 20 },
  Water: { Attack: 40, Defend: 30, Heal: 30 },
};

const getRandomItem = (list, defaultValue = "Attack") => {
  if (!list || list.length === 0) {
    console.warn(
      "Warning: Empty list passed to getRandomItem, returning default value."
    );
    return defaultValue; // Fallback to a default value like "Attack"
  }
  return list[Math.floor(Math.random() * list.length)];
};

const getCardRarity = (cardStats) => {
  const { value, specialValue } = cardStats;
  let rarityWeight = value + specialValue; // Rarity should be influenced by card stats

  if (rarityWeight <= 30) return "Common";
  if (rarityWeight <= 50) return "Uncommon";
  if (rarityWeight <= 70) return "Rare";
  if (rarityWeight <= 90) return "Epic";
  return "Legendary";
};

// Generate the card with the updated logic for handling empty filters
const generateCard = () => {
  const element = getRandomItem(_elements);
  const typeRatio = typeRatios[element];

  // Ensure filter always returns at least one valid type
  let validTypes = _types.filter(
    (type) => Math.random() * 100 <= typeRatio[type]
  );

  // If filter results in an empty array, fallback to a default type (e.g., "Attack")
  if (validTypes.length === 0) {
    validTypes = ["Attack"]; // You can customize this default value if needed
  }

  const type = getRandomItem(validTypes); // Randomly pick one valid type from the result

  const cost = Math.floor(Math.random() * 5) + 1;
  const value = Math.floor(Math.random() * 21) + 10;
  const specialType = getRandomItem(_specialTypes);
  const specialValue = Math.floor(Math.random() * 16) + 5;
  const specialDuration = Math.floor(Math.random() * 5) + 1;
  const rarity = getCardRarity({ value: value, specialValue: specialValue });

  const prefix = getRandomItem(specialPrefixes[specialType] || []);
  const baseName = getRandomItem(
    elementKeywords[element][type] || [`${element} ${type}`]
  );
  const name = `${prefix} ${baseName}`.trim();

  return {
    name,
    element,
    value,
    cost,
    type,
    special:
      specialType === "damage-over-time"
        ? {
            name: specialType.charAt(0).toUpperCase() + specialType.slice(1),
            type: specialType,
            value: specialValue,
            duration: specialDuration,
          }
        : {
            name: specialType.charAt(0).toUpperCase() + specialType.slice(1),
            type: specialType,
            value: specialValue,
          },
    rarity,
    trait: getRandomItem(_traits),
    affinity: {
      strongAgainst: getRandomItem(["Fire", "Earth", "Air", "Water"]),
      weakAgainst: getRandomItem(["Fire", "Earth", "Air", "Water"]),
    },
  };
};

export {
  elements,
  types,
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
  generateCard
};
