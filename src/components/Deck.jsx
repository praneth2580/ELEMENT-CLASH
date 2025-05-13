import React, { useEffect, useState } from "react";
import "../Card.css";
import { elements, types } from "../scripts/Cards";
import { deckLogos } from "../config";
import Air from "../assets/img/decks/air";

const color = "#F3A91E";
const bg = "#000000";

const Deck = ({ onClick, type, name, color }) => {
  const elementColor = color;
  const graphic = deckLogos[type];

  return (
    <div className="card-wrapper hover:bg-slate-500 rounded p-2">
      <div
      className="rounded-lg width-full aspect-[2/3] bg-white flex items-center justify-center">
        <Air className="h-10 fill-amber-600"/>
      </div>
      <h2 className="text-center text-xl">{name}</h2>
    </div>
  );
};

export default Deck;
