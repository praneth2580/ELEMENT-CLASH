import { useCardGameStorage } from "./data/hooks/useCardGameStorage";

import _cards from "./cards.json";

function getRandomCards(n, cards = _cards) {
  if (n === 0) return [];

  // Guard against requesting more cards than available
  if (n > cards.length) {
    console.warn("Requested more cards than available. Returning shuffled deck.");
    n = cards.length;
  }

  // Shuffle using Fisher-Yates algorithm
  const shuffled = [...cards];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, n);
}


function pickHand( entityRef, n, cards = _cards) {
  const aura = entityRef.aura;
  let hand = [];
  const priority_list = [];
  const filler_list = [];
  let priority_length = n;
  let filler_length = 0;

  for (let i = 0; i < cards.length; i++) {
    if (cards[i].cost <= aura) {
      priority_list.push(cards[i])
    } else {
      filler_list.push(cards[i])
    }
  }

  if (priority_list.length < priority_length) {
    priority_length = priority_list.length;
    filler_length = n - priority_length;
  }

  console.log(priority_list, filler_list);

  return [...getRandomCards(priority_length, priority_list), ...getRandomCards(filler_length, filler_list)];
}

function removeByIndexes(array, indexesToRemove) {
  const indices = Array.isArray(indexesToRemove)
    ? indexesToRemove
    : [indexesToRemove];
  return array.filter((_, index) => !indices.includes(index));
}

export { getRandomCards, removeByIndexes, pickHand };
