import _cards from "./cards.json";

function getRandomCards(n, cards = _cards) {
    return Array.from({ length: n }, () => cards[Math.floor(Math.random() * cards.length)]);
}

function removeByIndexes(array, indexesToRemove) {
    const indices = Array.isArray(indexesToRemove) ? indexesToRemove : [indexesToRemove];
    return array.filter((_, index) => !indices.includes(index));
}

export {
    getRandomCards,
    removeByIndexes
}