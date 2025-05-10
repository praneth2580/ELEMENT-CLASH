import {
  elements,
  types,
  specialEffects,
  rarities,
  traits,
  elementKeywords,
  specialPrefixes,
  traitsByRarity,
  synergies,
} from "../config";

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

function mergeBaseStats(card1, card2) {
  // You can customize this logic to prefer stronger card
  const base = card1.value >= card2.value ? card1 : card2;

  return {
    ...base,
    id: `${card1.id}_${card2.id}`, // Optional: composite ID
    synergySource: [card1.id, card2.id], // trace original cards
  };
}

function getSynergy(card1, card2) {
  const e1 = card1.element;
  const e2 = card2.element;

  for (const synergy of synergies) {
    const [s1, s2] = synergy.elements;

    // Helper to transform effect into a final card
    const buildCardFromEffect = (effect, level) => {
      const base = card1.value >= card2.value ? card1 : card2;
      const newCard = { ...base };

      newCard.id = `${card1.id}_${card2.id}`;
      newCard.name = synergy.name;
      newCard.level = level;
      newCard.synergySource = [card1.id, card2.id];

      // Handle calculated fields
      if (effect.damageMultiplier) {
        newCard.value = Math.round(base.value * effect.damageMultiplier);
      } else if (effect.damage) {
        newCard.value = effect.damage;
      } else if (effect.block) {
        newCard.type = 'defend';
        newCard.value = effect.block;
      } else if (effect.heal) {
        newCard.type = 'heal';
        newCard.value = effect.heal;
      } else {
        // fallback to average value if undefined
        newCard.value = Math.round((card1.value + card2.value) / 2);
      }

      // Optionally increase cost slightly for upgraded effects
      newCard.cost = base.cost + (level === 'upgrade' ? 1 : 0);

      return newCard;
    };

    if (e1 === s1 && e2 === s2) {
      return buildCardFromEffect(synergy.upgradeEffect, 'upgrade');
    }

    if ((e1 === s2 && e2 === s1) || [e1, e2].some(e => synergy.elements.includes(e))) {
      return buildCardFromEffect(synergy.downgradeEffect, 'downgrade');
    }
  }

  return null; // No synergy
}

// ========== Card Generation ==========

const generateCard = (no_of_cards) => {
  if (!no_of_cards || no_of_cards <= 0) return [];

  const cards = Array.from({ length: no_of_cards }, getCardBasics); // Generate N random cards

  cards.forEach((card) => {
    card.rarity = determineRarity(cards, card);
    card.special = getSpecialEffectForCard(
      card.rarity,
      card.element,
      card.type
    );
    card.trait = getRandomItem(_traits);
    card.name = generateCardName(
      card.element,
      card.type,
      card.rarity,
      card.special
    );
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
