import React, { useEffect, useState } from "react";
import "../Card.css";
import { elements, types } from "../scripts/Cards";
import { deckLogos } from "../config";
import Air from "../assets/img/decks/air";

const color = "#F3A91E";
const bg = "#000000";

const GraphicSelector = (type, className) => {
  switch (type) {
    case "Air":
      break;
    case "Dragon":
      break;
    case "Eagle":
      break;
    case "Earth":
      break;
    case "Fire":
      break;
    case "King":
      break;
    case "Lion":
      break;
    case "Skull":
      break;
    case "Snake":
      break;
    case "Spear":
      break;
    case "Swoard":
      break;
    case "Warrior":
      break;
    case "Water":

    default:
      break;
  }
};

// const Deck = ({ onClick, type, name, color }) => {
//   const elementColor = color;
//   const graphic = deckLogos[type];

//   return (
//     <div className="card-wrapper hover:bg-slate-500 rounded p-2">
//       <div className="rounded-lg width-full aspect-[2/3] bg-white flex items-center justify-center">
//         <graphic className="h-10 fill-amber-600" />
//       </div>
//       {name && <h2 className="text-center text-xl">{name}</h2>}
//     </div>
//   );
// };
const Deck = ({ onClick, type, name, color }) => {
  const elementColor = color;
  const Graphic = deckLogos[type]; // ← Capitalized

  return (
    <div
      className="card-wrapper hover:bg-slate-500 rounded p-2 cursor-pointer"
      onClick={onClick}
    >
      <div className="rounded-lg w-full aspect-[2/3] bg-white flex items-center justify-center">
        <Graphic className="h-10 fill-amber-600" />
      </div>
      {name && <h2 className="text-center text-xl">{name}</h2>}
    </div>
  );
};

export default Deck;
