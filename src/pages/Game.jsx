import React, { useEffect, useRef, useState } from "react";
import { removeByIndexes } from "../functions";
import Player from "../scripts/Player";
import AI from "../scripts/Ai";
import GameBoard from "../components/Board"; // ⭐ your Card component
import "../Card.css"; // ⭐ card styles
import { Tooltip } from "react-tooltip"; // ✨ New tooltip library
import "react-tooltip/dist/react-tooltip.css"; // ✨ Tooltip CSS
import DevBoard from "../components/DevBoard";
import { specialTypes } from "../scripts/Cards";
import { useCardGameStorage } from "../data/hooks/useCardGameStorage";
import { DeckPopup } from "../components/DeckPopup";

export default function ElementClash({ dev }) {
  let playerRef = useRef(null);
  let aiRef = useRef(null);

  const { cards, decks } = useCardGameStorage();

  const [playerStats, setPlayerStats] = useState({
    HP: 0,
    shield: 0,
    aura: 0,
    tac_aura: 0,
    deck: [],
    effects: [],
    hand: [],
    card: null,
  });
  const [aiStats, setAiStats] = useState({
    HP: 0,
    shield: 0,
    aura: 0,
    tac_aura: 0,
    deck: [],
    effects: [],
    hand: [],
    card: null,
  });

  let playerPrevStats = useRef(playerStats);
  let aiPrevStats = useRef(aiStats);

  const [isDeckModalOpen, setIsDeckModalOpen] = useState(true);
  const [currentTurn, setCurrentTurn] = useState(0); // 0 = Player, 1 = AI
  const [currentRound, setCurrentRound] = useState(1);
  const [message, setMessage] = useState("Let the clash begin!");

  const auraPerRound = (round) => {
    let increment = 0;
    if (round < 6) increment = round;
    else if (round >= 6 && round <= 10) increment = round / 2;
    else increment = 6;

    playerRef.current?.addAura(increment);
    aiRef.current?.addAura(increment);
  };

  const setPlayerDeck = (deck) => {
    playerRef.current?.setDeck(deck);
    playerRef.current.drawCards(3);
    setIsDeckModalOpen(false);

    syncStats();
  };

  function syncStats() {
    setPlayerStats(playerRef.current.getStats());
    setAiStats(aiRef.current.getStats());

    // console.log("Player :", playerStats);
    // console.log("AI :", aiStats);
  }

  function setPrevStats() {
    playerPrevStats = playerStats;
    aiPrevStats = aiStats;
  }

  function isGameOver() {
    if (playerRef.current.HP <= 0 || aiRef.current.HP <= 0) {
      setMessage(
        `${playerRef.current.HP <= 0 ? "AI" : "Player"} has won the Game`
      );
      setCurrentTurn(-1);
      return true;
    }
    return false;
  }

  const playCard = (card) => {
    const attacker = currentTurn == 0 ? playerRef : aiRef;

    if (card == null) return setCurrentTurn(currentTurn == 0 ? 1 : 0);

    if (card.cost > attacker.current?.aura)
      return setMessage(`${playerRef.constructor.name} has not enough Aura`);

    const card_idx = attacker.current?.hand.indexOf(card);
    attacker.current?.selectCard(card_idx);

    setCurrentTurn(currentTurn == 0 ? 1 : 0);
    syncStats();
  };

  function applyCards() {
    if (isGameOver()) return;

    // console.clear();
    // console.log(playerRef.current?.card);
    // console.log(aiRef.current?.card);

    const player = {
      damage: 0,
      heal: 0,
      shield: 0,
      card: playerRef.current?.card,
    };
    const ai = {
      damage: 0,
      heal: 0,
      shield: 0,
      card: aiRef.current?.card,
    };

    if (player.card) {
      // setup on player
      if (player.card.type.toLowerCase() === "attack") {
        player.damage = player.card.value;
        setMessage(
          `${playerRef.current.constructor.name} attacked for ${player.card.value} damage!`
        );
      } else if (player.card.type.toLowerCase() === "heal") {
        player.heal = player.card.value;
        setMessage(
          `${playerRef.current.constructor.name} healed for ${player.card.value} HP!`
        );
      } else if (player.card.type.toLowerCase() === "defend") {
        player.shield = player.card.value;
        setMessage(
          `${playerRef.current.constructor.name} raised a shield of ${player.card.value}!`
        );
      }
    }

    // setup on ai

    if (ai.card) {
      if (ai.card.type.toLowerCase() === "attack") {
        ai.damage = ai.card.value;
        setMessage(
          `${aiRef.current.constructor.name} attacked for ${ai.card.value} damage!`
        );
      } else if (ai.card.type.toLowerCase() === "heal") {
        ai.heal = ai.card.value;
        setMessage(
          `${aiRef.current.constructor.name} healed for ${ai.card.value} HP!`
        );
      } else if (ai.card.type.toLowerCase() === "defend") {
        ai.shield = ai.card.value;
        setMessage(
          `${aiRef.current.constructor.name} raised a shield of ${ai.card.value}!`
        );
      }
    }

    if (player.card?.special)
      playerRef.current?.addSpecial(player.card.special);
    if (ai.card?.special) aiRef.current?.addSpecial(ai.card.special);

    if (player.shield > 0) playerRef.current?.addShield(player.shield);
    if (ai.shield > 0) aiRef.current?.addShield(ai.shield);

    if (player.damage > 0) aiRef.current?.takeDamage(player.damage);
    if (ai.damage > 0) playerRef.current?.takeDamage(ai.damage);

    if (player.heal > 0) playerRef.current?.heal(player.heal);
    if (ai.heal > 0) aiRef.current?.heal(ai.heal);

    playerRef.current?.applySpecialEffects();
    aiRef.current?.applySpecialEffects();

    if (player.card) playerRef.current?.playCard(player.card);
    if (ai.card) aiRef.current?.playCard(ai.card);

    syncStats();
  }

  // this STARTS THE GAME
  useEffect(() => {
    if (cards.length === 0) return; // Wait until cards are loaded

    // INITIATE REFERENCES
    playerRef.current = new Player("player", 100, cards);
    aiRef.current = new AI("ai", 100, cards);

    // DRAW NEW CARD TO HAND
    // playerRef.current.drawCards(3);
    aiRef.current.drawCards(3);

    syncStats();
    setPrevStats();
  }, [cards]);

  // AFTER EVERY TURN
  useEffect(() => {
    if (cards.length === 0) return; // Wait until cards are loaded

    setCurrentRound(currentRound + 0.5);
  }, [currentTurn]);

  // AFTER EVERY ROUND
  useEffect(() => {
    if (cards.length === 0) return; // Wait until cards are loaded
    if (currentRound.toString().includes(".")) return;

    if (isGameOver()) return;
    applyCards();

    playerRef.current?.saveTurnStats(playerPrevStats, playerStats);
    aiRef.current?.saveTurnStats(aiPrevStats, aiStats);
    
    auraPerRound(currentRound);
    setCurrentRound(currentRound + 0.5);
    setPrevStats();
    syncStats();
  }, [currentRound]);

  useEffect(() => {
    setIsDeckModalOpen(true);
  }, []);

  return (
    <>
      <DeckPopup
        isOpen={isDeckModalOpen}
        selectDeck={setPlayerDeck}
        decks={decks}
      />
      {dev ? (
        <DevBoard
          playerStats={playerStats}
          aiStats={aiStats}
          currentRound={currentRound}
          currentTurn={currentTurn}
          message={message}
          playCard={playCard}
        />
      ) : (
        <GameBoard
          playerStats={playerStats}
          aiStats={aiStats}
          playerHand={playerStats.hand}
          playerDeck={playerRef.current?.deck}
          onCardPlay={playCard}
          currentTurn={currentTurn}
          currentRound={currentRound}
          message={message}
        />
      )}
    </>
  );
}
