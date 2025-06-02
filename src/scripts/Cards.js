import {
  gameConfig,
  elements,
  generationConfig,
  traits,
  traitsByRarity,
  elementKeywords,
  specialPrefixes,
  specialEffects
} from "../config";

const VALUE_SCALE = 0.5; // 50% scale, adjust to suit your needs (0 < scale <= 1)

function getRandomElement() {
  const entries = Object.entries(elements);
  const total = entries.reduce((sum, [_, val]) => sum + val.ratio, 0);
  const roll = Math.random() * total;
  let acc = 0;
  for (const [element, data] of entries) {
    acc += data.ratio;
    if (roll < acc) return element;
  }
}

function getRandomType(element) {
  const typeDist = elements[element].type_ratios;
  const roll = Math.random() * 100;
  let acc = 0;
  for (const [type, ratio] of Object.entries(typeDist)) {
    acc += ratio;
    if (roll <= acc) return type;
  }
}

function getValueAndCost(element, type) {
  const [min, max] = elements[element].value[type];
  // scale min/max before generating rawValue for better distribution
  const scaledMin = Math.ceil(min * VALUE_SCALE);
  const scaledMax = Math.floor(max * VALUE_SCALE);
  const rawValue = Math.floor(Math.random() * (scaledMax - scaledMin + 1)) + scaledMin;

  const costMultiplier = elements[element].cost_multiplier[type];
  let cost = Math.round(rawValue * costMultiplier);

  // clamp cost to aura limits
  cost = Math.min(gameConfig.aura.max, Math.max(gameConfig.aura.min, cost));

  return { value: rawValue, cost };
}

function getRarity() {
  const roll = Math.random();
  let acc = 0;
  for (const [rarity, prob] of Object.entries(
    generationConfig.rarityProbability
  )) {
    acc += prob;
    if (roll <= acc) return rarity;
  }
  return "Common";
}

function maybeAssignSpecial(type, rarity, element) {
  const chance =
    generationConfig.specialEffectProbabilityByType[type] *
    generationConfig.rarityEffectBoost[rarity];
  if (Math.random() <= chance) {
    const options = Object.entries(specialEffects).filter(
      ([_, data]) =>
        data.compatibleTypes.includes(type) &&
        data.compatibleElements.includes(element)
    );
    if (options.length === 0) return null;
    const [key, data] = options[Math.floor(Math.random() * options.length)];
    const value =
      Math.floor(
        Math.random() * (data.valueRange[1] - data.valueRange[0] + 1)
      ) + data.valueRange[0];
    const duration =
      Math.floor(
        Math.random() * (data.durationRange[1] - data.durationRange[0] + 1)
      ) + data.durationRange[0];
    return {
      name: key,
      type: data.type,
      value,
      duration,
    };
  }
  return null;
}

function generateCardName(element, type, special) {
  const baseNames = elementKeywords[element][type];
  const base = baseNames[Math.floor(Math.random() * baseNames.length)];
  if (!special) return base;

  const prefixList = specialPrefixes[special.type] || [];
  const prefix = prefixList[Math.floor(Math.random() * prefixList.length)];
  return `${prefix} ${base}`;
}

export function generateCard() {
  const element = getRandomElement();
  const type = getRandomType(element);
  const rarity = getRarity();
  const { value, cost } = getValueAndCost(element, type);
  const special = maybeAssignSpecial(type, rarity, element);
  const name = generateCardName(element, type, special);
  const traitPool = [...traits, ...(traitsByRarity[rarity] || [])];
  const trait = traitPool[Math.floor(Math.random() * traitPool.length)];

  return {
    name,
    element,
    type,
    value,
    cost,
    rarity,
    trait,
    affinity: elements[element].affinities,
    ...(special && { special }),
  };
}

let cardIdCounter = 1;

export function generateCards(no_of_cards) {
  if (!no_of_cards || no_of_cards <= 0) return [];

  const cards = Array.from({ length: no_of_cards }, () => {
    const card = generateCard();
    card.id = "CA-" + cardIdCounter++;
    return card;
  });
  cardIdCounter = 1;
  return cards;
}

// Analyser function to summarize an array of cards
export function analyzeCards(cards) {
  const summary = {
    total: cards.length,
    byElement: {},
    byType: {},
    byRarity: {},
    byCost: {},
    specialCount: 0,
    traits: {},
    avgCost: 0,
    avgValue: 0,
  };

  let totalCost = 0;
  let totalValue = 0;

  for (const card of cards) {
    // Count by element
    summary.byElement[card.element] =
      (summary.byElement[card.element] || 0) + 1;

    // Count by type
    summary.byType[card.type] = (summary.byType[card.type] || 0) + 1;

    // Count by rarity
    summary.byRarity[card.rarity] = (summary.byRarity[card.rarity] || 0) + 1;

    // Count traits
    summary.traits[card.trait] = (summary.traits[card.trait] || 0) + 1;

    // Count by rarity
    summary.byCost[card.cost] = (summary.byCost[card.cost] || 0) + 1;


    // Count special effects
    if (card.special) summary.specialCount++;

    totalCost += card.cost;
    totalValue += card.value;
  }

  summary.avgCost = +(totalCost / cards.length).toFixed(2);
  summary.avgValue = +(totalValue / cards.length).toFixed(2);

  return summary;
}
