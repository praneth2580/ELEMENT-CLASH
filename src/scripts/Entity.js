import { useCardGameStorage } from "../data/hooks/useCardGameStorage";
import { getRandomCards, removeByIndexes } from "../functions";

export default class Entity {

  
  constructor(initialHP, deck, deckCount = 10) {
    this.maxHP = initialHP;
    this.HP = initialHP;
    this.shield = 0;
    this.effects = [];
    this.hand = [];
    this.deck = getRandomCards(deckCount, deck); // populate based on your logic
    this.used = [];
    this.aura = 5;
    this.tac_aura = 0;
    this.card = null;
  }

  // APPEND AURA TO EXISTING AURA UPTO 10
  addAura(value) {
    this.aura = Math.min(10, value);
  }
  
  // PICK THREE RANDOM CARDS FROM THE DECK
  drawHand(num) {
    this.hand = getRandomCards(num, this.deck);
    this.hand.forEach((hand) => {
      this.deck = removeByIndexes(this.deck, this.deck.indexOf(hand));
    });
  }

  getStats() {
    return {
      HP: this.HP,
      aura: this.aura,
      tac_aura: this.tac_aura,
      deck: this.deck,
      shield: this.shield,
      effects: this.effects,
      hand: this.hand,
      card: this.card
    };
  }


  addSpecial(special) {
    this.effects.push(special);
  }

  applySpecial() {
    for (let i = 0; i < this.effects.length; i++) {
      switch (this.effects[i].type) {
        case "damage-over-time":
          if (this.effects[i].duration && this.effects[i].duration > 0)
            this.applyDamage(this.effects[i].value);
          break;
        case "heal":
          this.heal(this.effects[i].value);
          break;

        default:
          break;
      }

      if (this.effects[i].duration) this.effects[i].duration -= 1;
      if (this.effects[i].duration <= 0 || !this.effects[i].duration)
        this.effects = removeByIndexes(this.effects, i);
    }
  }

  getSumEffects(type) {
    const sumBlock =
      this.effects
        .filter((e) => e.type === type)
        .reduce((sum, effect) => sum + (effect.value || 0), 0) || 0;
    const blockEffectsIndex = this.effects
      .map((effect, index) => (effect.type === type ? index : -1))
      .filter((index) => index !== -1);

    this.effects = removeByIndexes(this.effects, blockEffectsIndex);
    return sumBlock;
  }

  applyDamage(damage) {
    console.log(`💢 [${this.constructor.name}] Taking damage: ${damage}`);

    const totalBuffs = Math.max(1,this.getSumEffects('buff'));
    const totalDebuffs = Math.max(1,this.getSumEffects('debuff'));
    const totalBlocks = Math.min(0,this.getSumEffects('block'));

    let final_damage = (((damage * totalBuffs) / totalDebuffs) - totalBlocks) || 0; 

    if (this.shield > 0) {
      let temp_shield = this.shield;
      temp_shield -= final_damage * 0.75; // blocks damange if shield is present and also account for block effect
      this.shield = Math.min(0, temp_shield);
      final_damage = final_damage + temp_shield;
    }

    this.HP = this.HP - final_damage; // if more damage that shield then deduct from health

    console.log(
      `💢 [${this.constructor.name}] HP: ${this.HP} SHIELD: ${this.shield}`
    );

    this.normalize();
  }

  normalize() {
    this.HP = Math.min(this.maxHP, Math.max(0, this.HP));
    this.shield = Math.max(0, this.shield);
  }

  heal(hp) {
    this.HP += hp;
    this.normalize();
  }

  setShield(value) {
    this.shield = value;
  }

  pickFromHand() {
    const card = getRandomCards(1, this.hand)[0];
    this.cardPlayered(card);
    return card;
  }

  cardPlayered(index) {
    const played_card = this.hand[index];

    this.used = played_card;
    this.hand[index] = getRandomCards(1, this.deck)[0];
    // this.hand = removeByIndexes(this.hand, index);
  }
}
