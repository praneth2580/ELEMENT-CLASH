import React, { useEffect, useState } from "react";
import "../Card.css";
import { elements, types } from "../scripts/Cards";
import { deckLogos } from "../config";
import Air from "../assets/img/decks/air";
import Add from "../assets/img/decks/add";

const color = "#F3A91E";
const bg = "#000000";

const Deck = ({ onClick, type, name, color }) => {
  const elementColor = color;
  const Graphic = deckLogos[type]; // ← Capitalized

  return (
    <div
      className="card-wrapper rounded p-2 cursor-pointer"
      onClick={onClick}
    >
      <div className="rounded-lg w-full aspect-[2/3] bg-slate-400 hover:bg-slate-200 flex items-center justify-center">
        <Add className="h-12"/>
      </div>
    </div>
  );
};

export default Deck;
