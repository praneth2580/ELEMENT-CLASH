// import { getRandomCards, removeByIndexes } from "../functions";

import Entity from "./Entity";

// export default class AI {

//     deck;
//     hand;
//     discarded;
//     HP;
//     shield;

//     constructor(deck_card_count, health = 100, shield = 0) {
//         this.deck = this.setupDeck(deck_card_count);
//         this.HP = health;
//         this.shield = shield;
//     }

//     setupDeck(no_of_cards) {
//         return getRandomCards(no_of_cards)
//     }

//     drawHand(no_of_cards) {
//         this.hand = getRandomCards(no_of_cards, this.deck);
//     }

//     cardPlayered(index) {
//         const played_card = this.hand[index];

//         this.discarded = played_card;
//         this.hand = removeByIndexes(this.hand, index);
//     }

//     setHP(health) {
//         this.HP = health;
//     }

//     setShield(shield) {
//         this.shield = shield;
//     }

//     pickFromHand() {
//         const card = getRandomCards(1, this.hand);
//         this.cardPlayered(card);
//         return card
//     }

// }


export default class AI extends Entity {

}