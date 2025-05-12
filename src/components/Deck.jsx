import React, { useEffect, useState } from "react";
import "../Card.css";
import { elements, types } from "../scripts/Cards";
import { deckLogos } from "../config";
import Air from "../assets/img/decks/air";

const color = "#F3A91E";
const bg = "#000000";

const CARD_SIZES = {
  lg: {
    card: {
      width: "20rem",
      borderWidth: "4px",
      padding: "0.5rem 1rem"
    }
  },
  md: {
    card: {
      width: "16rem",
      borderWidth: "3px",
      padding: "0.5rem .5rem"
    }
  },
  sm: {
    card: {
      width: "13rem",
      borderWidth: "2px",
      padding: ".5rem .5rem"
    }
  },
};

function useCardSize() {
  const [size, setSize] = useState("lg");

  useEffect(() => {
    const checkSize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setSize("sm");
      } else if (width < 1024) {
        setSize("md");
      } else {
        setSize("lg");
      }
    };

    checkSize(); // set on mount

    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  return size;
}

const Deck = ({ onClick, type, name, color }) => {
  const elementColor = color;
  const graphic = deckLogos[type];
  const size = useCardSize();
  const styles = CARD_SIZES[size];

  return (
    <div className="card-wrapper">
      <div
        className="card"
        style={{
          border: styles.card.borderWidth + " solid " + elementColor,
          backgroundColor: bg,
          width: styles.card.width,
          padding: styles.card.padding
        }}
      >
        <Air/>
      </div>
    </div>
  );
};

export default Deck;
