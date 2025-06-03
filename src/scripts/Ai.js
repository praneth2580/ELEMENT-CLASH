// import { getRandomCards, removeByIndexes } from "../functions";

import { getRandomCards } from "../functions";
import Entity from "./Entity";

export default class AI extends Entity {
  autoPlayCard() {
    const card = getRandomCards(1, this.hand)[0];
    this.cardPlayered(card);
    return card;
  }
}
