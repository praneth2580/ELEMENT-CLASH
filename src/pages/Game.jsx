import React, { useEffect, useRef, useState } from "react";
import cards from "../cards.json";
import { getRandomCards, removeByIndexes } from "../functions";
import AI from "../scripts/Ai";
import Player from "../scripts/Player";

export default function ElementClash() {
  const [aiHP, setAiHP] = useState(0);
  const [aiShield, setAiShield] = useState(40);
  const [aiDeck, setAiDeck] = useState(null);
  const [aiHand, setAiHand] = useState(null);
  const [aiEffects, setAiEffects] = useState([]);
  const [aiAura, setAiAura] = useState(0);
  let aiRef = useRef(null);

  const [playerHP, setPlayerHP] = useState(0);
  const [playerShield, setPlayerShield] = useState(0);
  const [playerDeck, setPlayerDeck] = useState(null);
  const [playerHand, setPlayerHand] = useState(null);
  const [playerEffects, setPlayerEffects] = useState([]);
  const [playerAura, setPlayerAura] = useState(0);
  let playerRef = useRef(null);

  const [currentRound, setCurrentRound] = useState(0);
  const [currentTurn, setCurrentTurn] = useState(0);
  const [message, setMessage] = useState("Choose your card!");

  function setupGame() {
    console.log("🔧 Setting up game...");
  
    playerRef.current = new Player(100);
    setPlayerHP(playerRef.current.HP);
    setPlayerDeck(playerRef.current.deck);
    playerRef.current.drawHand(3);
    setPlayerHand(playerRef.current.hand);
    console.log("🧙 Player initialized:", playerRef.current);
  
    aiRef.current = new AI(100);
    setAiHP(aiRef.current.HP);
    setAiDeck(aiRef.current.deck);
    aiRef.current.drawHand(3);
    setAiHand(aiRef.current.hand);
    console.log("🤖 AI initialized:", aiRef.current);
  
    setPlayerAura(6);
    setAiAura(6);
  }

  function elementalModifier(attacker, defender) {
    const strengths = {
      Fire: "Air",
      Air: "Earth",
      Earth: "Water",
      Water: "Fire",
    };
    const modifier = strengths[attacker] === defender ? 1.5 : strengths[defender] === attacker ? 0.75 : 1;
    console.log(`⚔️ Elemental modifier from ${attacker} to ${defender}: x${modifier}`);
    return modifier;
  }

  function addDamage(_damage) {
    let damage = _damage || 0;
  
    let oppHP = currentTurn == 0 ? aiHP : playerHP;
    let setOppHP = currentTurn == 0 ? setAiHP : setPlayerHP;
    let oppShield = currentTurn == 0 ? aiShield : playerShield;
    let setOppShield = currentTurn == 0 ? setAiShield : setPlayerShield;
  
    let effects = currentTurn == 0 ? playerEffects : aiEffects;
    const setEffects = currentTurn == 0 ? setPlayerEffects : setAiEffects;
    let oppEffects = currentTurn == 0 ? aiEffects : playerEffects;
    let setOppEffects = currentTurn == 0 ? setAiEffects : setPlayerEffects;
  
    console.log(`🔻 Base damage: ${damage}`);
    console.log("🌀 Opponent effects before damage:", oppEffects);
  
    // Boost effects
    const oppBoostEffectIndexes = oppEffects.map((e, i) => (e.type === "boost" ? i : -1)).filter(i => i !== -1);
    let boostValue = oppEffects.filter(e => e.type === "boost").reduce((sum, e) => sum + (e.multiplier || 0), 1);
    damage = Math.max(damage * boostValue, 0);
    if (oppBoostEffectIndexes.length > 0)
      oppEffects = removeByIndexes(oppEffects, oppBoostEffectIndexes);
    console.log(`⚡ Boosted damage: ${damage}`);
  
    // Block effects
    const oppBlockEffectIndexes = oppEffects.map((e, i) => (e.type === "block" ? i : -1)).filter(i => i !== -1);
    let blockValue = oppEffects.filter(e => e.type === "block").reduce((sum, e) => sum + (e.value || 0), 0);
    damage = Math.max(damage - blockValue, 0);
    if (oppBlockEffectIndexes.length > 0)
      oppEffects = removeByIndexes(oppEffects, oppBlockEffectIndexes);
    console.log(`🛡️ Damage after block: ${damage}`);
  
    if (oppShield && oppShield > 0) {
      console.log(`🧱 Shield before damage: ${oppShield}`);
      oppShield = oppShield - (damage * 0.75);
    }
  
    if (oppShield < 0) {
      oppHP = Math.max(oppHP - Math.abs(oppShield), 0);
      oppShield = 0;
    }
  
    console.log(`💥 Final Damage Applied | HP: ${oppHP} | Shield: ${oppShield}`);
  
    setOppHP(oppHP);
    setOppShield(oppShield);
    setEffects(effects);
    setOppEffects(oppEffects);
  }
  
  function heal(hp) {
    let setHP = currentTurn == 0 ? setPlayerHP : setAiHP;
    console.log(`❤️ Healing for ${hp}`);
    setHP(prev => prev + hp);
  }
  
  function assignSpecialEffects(card) {
    const setEffects = currentTurn == 0 ? setPlayerEffects : setAiEffects;
    console.log(`✨ Applying special effect:`, card.special);
    setEffects(prev => [...prev, card.special]);
  }
  
  function executeSpecial(isPlayer) {
    let effects = isPlayer ? playerEffects : aiEffects;
    const setEffect = isPlayer ? setPlayerEffects : setAiEffects;
  
    if (effects.length > 0) {
      console.log(`🌀 Executing special effects for ${isPlayer ? "Player" : "AI"}`, effects);
  
      for (let i = 0; i < effects.length; i++) {
        const effect = effects[i];
  
        switch (effect.type) {
          case "damage-over-time":
            if (effect.duration === 0) {
              effects = removeByIndexes(effects, i);
              break;
            }
            console.log(`🔥 DoT: ${effect.value} damage`);
            addDamage(effect.value);
            effects[i].duration -= 1;
            break;
          case "heal":
            console.log(`💚 Heal effect: ${effect.value}`);
            heal(effect.value);
            effects = removeByIndexes(effects, i);
            break;
          default:
            console.log(`🔁 Effect processed:`, effect);
            break;
        }
      }
  
      setEffect(effects);
    }
  }
  
  function aiPlayCard() {
    if (playerHP <= 0 || aiHP <= 0) return;
  
    const card = aiRef.current.pickFromHand();
    console.log("🤖 AI plays card:", card);
  
    let damage = card.value;
  
    if (card.special) {
      assignSpecialEffects(card);
    }
  
    addDamage(damage);
    setCurrentTurn(0);
    setCurrentRound(prev => prev + 1);
  
    aiRef.current.setHP(aiHP);
    aiRef.current.setShield(aiShield);
  }
  
  function playCard(card) {
    if (playerHP <= 0 || aiHP <= 0) return;
  
    console.log("🧙 Player plays card:", card);
  
    let damage = card.value;
  
    if (card.special) {
      assignSpecialEffects(card);
    }
  
    addDamage(damage);
    setCurrentTurn(1);
  
    playerRef.current.setHP(playerHP);
    playerRef.current.setShield(playerShield);
    playerRef.current.cardPlayered(card);
  
    setTimeout(() => {
      aiPlayCard();
    }, 6000);
  }
  
  // Aura per turn
  useEffect(() => {
    console.log("🔄 Round changed:", currentRound);
    setPlayerAura((a) => Math.min(a + 1, 10));
    // executeSpecial(true);
  
    setAiAura((a) => Math.min(a + 1, 10));
    // executeSpecial(false);
  }, [currentRound]);
  
  useEffect(() => {
    setupGame();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
        {/* Player Debug - LEFT */}
        <div className="bg-blue-50 rounded-lg p-4 shadow-md">
          <h2 className="text-xl font-bold mb-2 text-center">🧙 Player</h2>
          <p className="text-sm">HP: {playerHP}</p>
          <p className="text-sm">Shield: {playerShield}</p>
          <p className="text-sm mb-2">Aura: {playerAura}</p>

          <h3 className="font-semibold text-sm mt-4">Effects</h3>
          <ul className="text-sm bg-white rounded p-2 max-h-40 overflow-auto shadow-inner">
            {playerEffects.length > 0 ? (
              playerEffects.map((eff, i) => (
                <li key={i}>
                  {eff.type} – {eff.value ?? eff.multiplier} –{" "}
                  {eff.duration ?? "∞"}
                </li>
              ))
            ) : (
              <li className="text-gray-500">None</li>
            )}
          </ul>

          <h3 className="font-semibold text-sm mt-4">Hand</h3>
          <ul className="text-sm bg-white rounded p-2 max-h-40 overflow-auto shadow-inner">
            {playerHand?.map((card, i) => (
              <li key={i}>
                {card.name} (Cost: {card.cost}, Dmg: {card.value})
              </li>
            ))}
          </ul>
        </div>

        {/* Game UI - CENTER */}
        <div className="bg-white rounded-lg p-4 shadow-md text-center">
          <h1 className="text-2xl font-bold mb-2">Element Clash</h1>
          <div className="text-sm mb-2">
            Round: {currentRound} | Turn:{" "}
            <strong>{currentTurn === 0 ? "Player" : "AI"}</strong>
          </div>
          <div className="mb-2 font-semibold">{message}</div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {playerHand &&
              playerHand.map((card, index) => (
                <button
                  key={index}
                  onClick={() => playCard(card)}
                  disabled={playerHP <= 0 || aiHP <= 0}
                  className="p-3 border rounded bg-gray-100 hover:bg-gray-200 shadow"
                >
                  <div className="font-bold">{card.name}</div>
                  <div className="text-sm">Element: {card.element}</div>
                  <div className="text-sm">Type: {card.type}</div>
                  <div className="text-sm">Cost: {card.cost}</div>
                  <div className="text-sm">Damage: {card.value}</div>
                  <div className="text-xs italic">{card.special?.name}</div>
                </button>
              ))}
          </div>
        </div>

        {/* AI Debug - RIGHT */}
        <div className="bg-red-50 rounded-lg p-4 shadow-md">
          <h2 className="text-xl font-bold mb-2 text-center">🤖 AI</h2>
          <p className="text-sm">HP: {aiHP}</p>
          <p className="text-sm">Shield: {aiShield}</p>
          <p className="text-sm mb-2">Aura: {aiAura}</p>

          <h3 className="font-semibold text-sm mt-4">Effects</h3>
          <ul className="text-sm bg-white rounded p-2 max-h-40 overflow-auto shadow-inner">
            {aiEffects.length > 0 ? (
              aiEffects.map((eff, i) => (
                <li key={i}>
                  {eff.type} – {eff.value ?? eff.multiplier} –{" "}
                  {eff.duration ?? "∞"}
                </li>
              ))
            ) : (
              <li className="text-gray-500">None</li>
            )}
          </ul>

          <h3 className="font-semibold text-sm mt-4">Hand</h3>
          <ul className="text-sm bg-white rounded p-2 max-h-40 overflow-auto shadow-inner">
            {aiHand?.map((card, i) => (
              <li key={i}>
                {card.name} (Cost: {card.cost}, Dmg: {card.value})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
