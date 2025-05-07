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

export default function ElementClash({ dev }) {
  const playerRef = useRef(null);
  const aiRef = useRef(null);

  const { cards } = useCardGameStorage();

  const [playerStats, setPlayerStats] = useState({
    HP: 0,
    shield: 0,
    aura: 0,
    tac_aura: 0,
    deck: [],
    effects: [],
    hand: [],
    aura: 0,
  });
  const [aiStats, setAiStats] = useState({
    HP: 0,
    shield: 0,
    aura: 0,
    tac_aura: 0,
    deck: [],
    effects: [],
    hand: [],
    aura: 0,
  });

  const [currentTurn, setCurrentTurn] = useState(0); // 0 = Player, 1 = AI
  const [currentRound, setCurrentRound] = useState(1);
  const [message, setMessage] = useState("Let the clash begin!");

  useEffect(() => {
    if (cards.length === 0) return; // Wait until cards are loaded
    playerRef.current = new Player(100, cards);
    aiRef.current = new AI(100, cards);

    playerRef.current.drawHand(3);
    aiRef.current.drawHand(3);

    syncStats();
  }, [cards]);

  useEffect(() => {
    if (cards.length === 0) return; // Wait until cards are loaded
    if (checkGameOver()) return;
    if (currentTurn === 0) return;

    const aiTurn = setTimeout(() => {
      playCard(aiRef.current.pickFromHand());
      syncStats();
    }, 3000);

    return () => clearTimeout(aiTurn);
  }, [currentTurn]);

  useEffect(() => {
    if (cards.length === 0) return; // Wait until cards are loaded
    if (checkGameOver()) return;

    playerRef.current.addAura(3);
    playerRef.current.applySpecial();

    aiRef.current.addAura(3);
    aiRef.current.applySpecial();

    syncStats();
  }, [currentRound]);

  function syncStats() {
    setPlayerStats(playerRef.current.getStats());
    setAiStats(aiRef.current.getStats());
  }

  function endTurn() {
    const nextTurn = (currentTurn + 1) % 2;
    if (nextTurn === 0) {
      setCurrentRound((prev) => prev + 1);
    }
    setCurrentTurn(nextTurn);
  }

  function checkGameOver() {
    if (playerRef.current.HP <= 0 || aiRef.current.HP <= 0) {
      setMessage(
        `${playerRef.current.HP <= 0 ? "AI" : "Player"} has Won the Game`
      );
      return true;
    }
    return false;
  }

  function playCard(card, target = "normal") {
    if (checkGameOver()) return;

    const attacker = currentTurn === 0 ? playerRef.current : aiRef.current;
    const defender = currentTurn === 0 ? aiRef.current : playerRef.current;

    if (attacker.aura < card.cost) {
      setMessage(
        `${attacker.constructor.name} has not enough Aura`
      )
      return;
    }

    if (target === "normal") {
      // Normal card play
      if (card.type.toLowerCase() === "attack") {
        defender.applyDamage(card.value);
        setMessage(
          `${attacker.constructor.name} attacked for ${card.value} damage!`
        );
      } else if (card.type.toLowerCase() === "heal") {
        attacker.heal(card.value);
        setMessage(`${attacker.constructor.name} healed for ${card.value} HP!`);
      } else if (card.type.toLowerCase() === "block") {
        attacker.setShield(card.value);
        setMessage(
          `${attacker.constructor.name} raised a shield of ${card.value}!`
        );
      }

      if (card.special) {
        if (specialTypes.attacker.includes(card.special.type)) {
          attacker.addSpecial(card.special);
        } else {
          defender.addSpecial(card.special);
        }
      }
    } else if (target === "synergy") {
      // Later implement synergy logic here 🚀
      setMessage(`${attacker.constructor.name} used a Synergy Play!`);
    }

    attacker.cardPlayered(attacker.hand.indexOf(card));
    syncStats();
    endTurn();
  }

  return (
    <>
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
