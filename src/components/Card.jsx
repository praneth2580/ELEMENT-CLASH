import React, { useState } from "react";
import { elements, types } from "../scripts/Cards";

export const DetailedCard = ({ card, onClose }) => {
  const elementColor = elements[card.element].color;
  const typeColor = types[card.type].color;

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[320px] aspect-[63/88] bg-[#1A1919] border-[3px] rounded-2xl p-2 sm:p-3 shadow-lg text-white flex flex-col justify-between"
        style={{ borderColor: elementColor }}
      >
        {/* Top row */}
        <div className="flex justify-between items-center mb-1 sm:mb-2">
          <div
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-md rotate-45 flex justify-center items-center text-xs sm:text-sm font-bold"
            style={{ backgroundColor: elementColor }}
          >
            <span className="-rotate-45">{card.cost}</span>
          </div>

          <div className="px-2 py-0.5 sm:px-3 sm:py-1 bg-black border border-white rounded-md text-xs sm:text-sm font-bold">
            {card.rarity.toUpperCase()}
          </div>

          <div
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-md flex justify-center items-center text-xs sm:text-sm font-bold"
            style={{ backgroundColor: typeColor }}
          >
            {card.value}
          </div>
        </div>

        {/* Image */}
        <div className="flex justify-center mb-2 sm:mb-3">
          <div
            className="rounded-full border-[4px] sm:border-[6px] p-1"
            style={{ borderColor: "#333" }}
          >
            <img
              src={elements[card.element].logo}
              alt={card.element}
              className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-full"
            />
          </div>
        </div>

        {/* Title */}
        <div className="text-center text-base sm:text-lg font-bold leading-tight mb-1 px-1 sm:px-2">
          {card.name.replaceAll("_", " ")}
        </div>

        {/* Trait */}
        <div className="text-center mb-1 sm:mb-2">
          <span
            className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs"
            style={{ backgroundColor: "#9f9424" }}
          >
            {card.trait}
          </span>
        </div>

        {/* Affinities - hide on very small screens */}
        <div className="hidden xs:flex justify-between text-xs font-medium mb-2 sm:mb-3 px-1">
          <span className="text-green-400">
            ▲ {card.affinity.strongAgainst}
          </span>
          <span className="text-red-400">▼ {card.affinity.weakAgainst}</span>
        </div>

        {/* Special section */}
        <div className="bg-[#2B2B2B] rounded-lg p-2 text-xs sm:text-sm">
          {card.special ? (
            <>
              <div className="text-center mb-1 sm:mb-2">
                <div className="font-bold uppercase">
                  {card.special.name.replaceAll("_", " ")}
                </div>
                <div className="text-[10px] sm:text-xs">
                  {card.special.type.replaceAll("_", " ")}
                </div>
              </div>
              <div className="flex justify-around items-center mt-1">
                <div
                  className="px-2 py-1 sm:px-3 rounded-md font-bold text-white text-xs"
                  style={{ backgroundColor: "#F3A91E" }}
                >
                  {card.cost}
                </div>
                <div
                  className="px-2 py-1 sm:px-3 rounded-md font-bold text-white text-xs"
                  style={{ backgroundColor: "#F31EC1" }}
                >
                  {card.duration ?? "∞"}
                </div>
                <div
                  className="px-2 py-1 sm:px-3 rounded-md font-bold text-white text-xs"
                  style={{ backgroundColor: "#00C853" }}
                >
                  {card.value}
                </div>
              </div>
            </>
          ) : (
            <p className="text-center">No Special Effect</p>
          )}
        </div>
      </div>
    </div>
  );
};

const Card = ({ card, onClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const elementColor = elements[card.element]?.color;
  const typeColor = types[card.type]?.color;

  return (
    <>
      <div
        className={`w-24 p-2 aspect-[3/4] rounded-md p-1 text-white border-2 shadow-md flex flex-col justify-between
    ${
      card.special
        ? "bg-gradient-to-br from-[#1A1919] to-[#2c0036] border-pink-500"
        : "bg-[#1A1919]"
    }`}
        style={{ borderColor: card.special ? "#F31EC1" : elementColor }}
        onClick={() => (onClick ? onClick(setIsOpen) : setIsOpen(true))}
      >
        {/* Special Indicator */}
        {/* {card.special && (
          <div className="absolute top-0 left-0 w-2.5 h-2.5 rounded-full bg-pink-500 animate-pulse z-10 translate-x-[-2px] translate-y-[-2px]" />
        )} */}

        {/* Top row */}
        <div className="flex justify-between items-center mb-1 sm:mb-2">
          <div
            className="w-6 aspect-square rounded-md rotate-45 flex justify-center items-center text-xs sm:text-sm font-bold"
            style={{ backgroundColor: elementColor }}
          >
            <span className="text-xs -rotate-45">{card.cost}</span>
          </div>

          <div
            className="w-6 aspect-square text-xs rounded-md flex justify-center items-center text-xs sm:text-sm font-bold"
            style={{ backgroundColor: typeColor }}
          >
            {card.value}
          </div>
        </div>

        {/* Image */}
        <img
          src={elements[card.element]?.logo}
          alt={card.element}
          className="w-10 h-10 mx-auto mb-1 object-contain rounded-full"
        />

        {/* Name */}
        <div className="text-center text-[10px] font-bold px-1 truncate">
          {card.name.replaceAll("_", " ")}
        </div>
      </div>

      {isOpen && <DetailedCard card={card} onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default Card;
