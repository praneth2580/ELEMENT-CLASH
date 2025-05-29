import React, { useEffect, useState } from "react";
import "../Card.css";
import { elements, types } from "../scripts/Cards";
import { deckLogos } from "../config";
import Air from "../assets/img/decks/air";

const color = "#F3A91E";
const bg = "#000000";

const Deck = ({ onClick, type, name, color }) => {
  const elementColor = color;
  const Graphic = deckLogos[type]; // ← Capitalized

  return (
    <div
      className="group card-wrapper hover:bg-slate-500 rounded p-2 cursor-pointer"
      onClick={onClick}
    >
      <div className="rounded-lg w-full aspect-[2/3] bg-white flex items-center justify-center">
        {Graphic ? <Graphic className="h-10 fill-amber-600" /> : <Air className="h-10 fill-amber-600"/>}
      </div>
      {name && <h2 className="group-hover:text-white text-center text-xl">{name}</h2>}
    </div>
  );
};

export default Deck;
