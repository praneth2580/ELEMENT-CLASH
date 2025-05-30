const elements = ["Fire", "Water", "Earth", "Air"];
const types = ["Attack", "Defend", "Heal"];
const rarities = ["Common", "Rare", "Epic", "Legendary"];

const specialEffectsByType = {
  Attack: [
    { name: "Burn", type: "DamageOverTime", value: 2 },
    { name: "Pierce", type: "IgnoreDefense", value: 1 },
  ],
  Defend: [
    { name: "Reflect", type: "CounterAttack", value: 3 },
    { name: "Shield Boost", type: "BlockBoost", value: 2 },
  ],
  Heal: [
    { name: "Regeneration", type: "HealOverTime", value: 3 },
    { name: "Cleanse", type: "RemoveDebuff", value: 0 },
  ],
};

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateCard(id) {
  const element = getRandom(elements);
  const type = getRandom(types);

  const cost = Math.floor(Math.random() * 7) + 1; // 1 to 7

  const value = Math.max(1, cost + (Math.floor(Math.random() * 5) - 2)); // cost +/- 2 roughly

  // Rarity weighted probabilities
  const rarityRoll = Math.random();
  let rarity;
  if (rarityRoll < 0.6) rarity = "Common";
  else if (rarityRoll < 0.85) rarity = "Rare";
  else if (rarityRoll < 0.97) rarity = "Epic";
  else rarity = "Legendary";

  let special;
  if (rarity !== "Common" && Math.random() < 0.7) {
    special = getRandom(specialEffectsByType[type]);
  }

  const name = `${element} ${type}` + (special ? ` ${special.name}` : "");

  return {
    id,
    name,
    element,
    type,
    cost,
    value,
    rarity,
    special,
  };
}

export default function generateCards(count) {
  const cards = [];
  for (let i = 1; i <= count; i++) {
    cards.push(generateCard(i));
  }
  return cards;
}
