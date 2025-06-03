import { useCardGameStorage } from "../data/hooks/useCardGameStorage";
import { getRandomCards, pickHand, removeByIndexes } from "../functions";

const max_shield = 100;

export default class Entity {
  constructor(name, initialHP, deck, deckCount = 10) {
    this.name = name;
    this.maxHP = initialHP;
    this.HP = initialHP;
    this.shield = 0;
    this.effects = [];
    this.hand = [];
    this.deck = getRandomCards(deckCount, deck);
    this.used = [];
    this.aura = 5;
    this.tac_aura = 0;
    this.card = null;
    this.logs = this.loadLogs(); // Load persisted logs
  }

  logAction(msg) {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${msg}`;
    this.logs.push(logEntry);
    console.log(`${this.name}: ${logEntry}`);
    this.saveLogs();
  }

  saveLogs() {
    localStorage.setItem(`log_${this.name}`, JSON.stringify(this.logs));
  }

  loadLogs() {
    return JSON.parse(localStorage.getItem(`log_${this.name}`)) || [];
  }

  saveTurnStats(prevStats, newStats) {
    const key = `turn_stats_${this.name}`;
    const prev = JSON.parse(localStorage.getItem(key)) || [];

    prev.push({
      timestamp: new Date().toISOString(),
      previous: prevStats,
      now: newStats,
    });

    localStorage.setItem(key, JSON.stringify(prev));
  }

  clearLogs() {
    this.logs = [];
    this.saveLogs();
  }

  printLog() {
    this.logs.forEach((log) => console.log(`${this.name}: ${log}`));
  }

  addAura(value) {
    this.logAction(`Aura before: ${this.aura}`);
    this.aura = Math.min(10, this.aura + value);
    this.logAction(`Gained ${value} aura → Now: ${this.aura}`);
  }

  useAura(value) {
    this.aura = Math.max(0, this.aura - value);
    this.logAction(`Used ${value} aura → Remaining: ${this.aura}`);
  }

  drawCards(num) {
    if (!this.deck || this.deck.length === 0) return;

    this.hand = pickHand(this, num, this.deck);
    this.hand.forEach((card) => {
      this.deck = removeByIndexes(this.deck, this.deck.indexOf(card));
    });
    this.logAction(`Drew ${num} cards to hand`);
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
      card: this.card,
    };
  }

  addSpecial(special) {
    this.effects.push(special);
    this.logAction(`Added special effect: ${special.name || special.type}`);
  }

  applySpecialEffects() {
    for (let i = 0; i < this.effects.length; i++) {
      const effect = this.effects[i];
      switch (effect.type) {
        case "damage-over-time":
          if (effect.duration && effect.duration > 0) {
            this.takeDamage(effect.value);
            this.logAction(`Applied DOT: ${effect.value}`);
          }
          break;
        case "heal":
          this.heal(effect.value);
          break;
        default:
          break;
      }

      if (effect.duration) effect.duration -= 1;
      if (effect.duration <= 0 || !effect.duration)
        this.effects = removeByIndexes(this.effects, i);
    }
  }

  consumeEffectsOfType(type) {
    const sum = this.effects
      .filter((e) => e.type === type)
      .reduce((sum, effect) => sum + (effect.value || 0), 0);
    const indexes = this.effects
      .map((e, i) => (e.type === type ? i : -1))
      .filter((i) => i !== -1);
    this.effects = removeByIndexes(this.effects, indexes);
    return sum;
  }

  takeDamage(damage) {
    const buffs = Math.max(1, this.consumeEffectsOfType("buff"));
    const debuffs = Math.max(1, this.consumeEffectsOfType("debuff"));
    const blocks = Math.min(0, this.consumeEffectsOfType("block"));

    let finalDamage = (damage * buffs) / debuffs - blocks;

    if (this.shield > 0) {
      let remainingShield = this.shield - finalDamage * 0.75;
      finalDamage += Math.min(0, remainingShield);
      this.shield = Math.max(0, remainingShield);
    }

    this.HP -= finalDamage;
    this.logAction(
      `Took ${finalDamage.toFixed(2)} damage → HP: ${this.HP}, Shield: ${
        this.shield
      }`
    );
    this.normalize();
  }

  normalize() {
    this.HP = Math.min(this.maxHP, Math.max(0, this.HP));
    this.shield = Math.max(0, this.shield);
  }

  heal(amount) {
    const prevHP = this.HP;
    this.HP += amount;
    this.normalize();
    this.logAction(`Healed ${amount} → HP: ${prevHP} → ${this.HP}`);
  }

  addShield(value) {
    const prev = this.shield;
    this.shield = Math.min(max_shield, this.shield + value);
    this.normalize();
    this.logAction(`Added ${value} shield → Shield: ${prev} → ${this.shield}`);
  }

  autoPlayCard() {
    const card = getRandomCards(1, this.hand)[0];
    this.playCard(card);
    return card;
  }

  playCard(card) {
    if (!card) return;

    const index = this.hand.indexOf(card);
    if (index === -1) return;

    this.used.push(card);
    this.hand[index] = getRandomCards(1, this.deck)[0];
    this.useAura(card.cost);
    this.card = null;

    this.logAction(
      `Played card: ${card.name || "Unknown"} (Cost: ${card.cost})`
    );
  }

  selectCard(index) {
    this.card = this.hand[index];
    this.logAction(`Selected card: ${this.card.name || "Unknown"}`);
  }
}
