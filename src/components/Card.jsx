import React, { useEffect, useState } from "react";
import "../Card.css";
import { elements, types } from "../scripts/Cards";

const costColor = "#F3A91E";
const durationColor = "#f31ec1";
const basicText = "#FFFFFF";
const basicBG = "#1A1919";
const basicCard = "#D9D9D929";


const CARD_SIZES = {
  lg: {
    card: {
      width: "20rem",
      borderWidth: "4px",
      padding: "0.5rem 1rem"
    },
    cardRow: {
      paddingBlock: "0.5rem",
    },
    cardRowTrait: {
      paddingBlock: "0.3rem",
    },
    costContainer: {
      width: "2rem",
      height: "2rem",
      borderRadius: "0.2rem",
    },
    costContainerP: {
      fontSize: "1rem",
    },
    valueContainer: {
      width: "2rem",
      height: "2rem",
      borderRadius: "0.2rem",
    },
    valueContainerP: {
      fontSize: "1rem",
    },
    rarityContainer: {
      padding: "0.5rem 2rem",
      borderRadius: "0.4rem",
    },
    rarityContainerP: {
      fontSize: "1rem",
    },
    elementImage: {
      width: "12rem",
      borderWidth: "0.4rem",
    },
    cardTitle: {
      fontSize: "1.2rem",
      lineHeight: "1.2rem",
    },
    cardTrait: {
      padding: "0.2rem 1rem",
      fontSize: "0.7rem",
    },
    cardStrongContainer: {
      gap: "0.3rem",
    },
    cardStrongContainerBefore: {
      borderLeft: ".4rem solid transparent",
      borderRight: ".4rem solid transparent",
      borderBottom: ".8rem solid green",
    },
    cardWeakContainer: {
      gap: "0.3rem",
    },
    cardWeakContainerAfter: {
      borderLeft: ".4rem solid transparent",
      borderRight: ".4rem solid transparent",
      borderTop: ".8rem solid red",
    },
    cardAffinityP: {
      fontSize: "1rem",
    },
    specialCard: {
      height: "6rem",
      borderRadius: "0.4rem",
      padding: "0.5rem",
    },
    specialName: {
      fontSize: "0.9rem",
    },
    specialType: {
      fontSize: "0.6rem",
    },
    specialDetailsContainer: {
      gridTemplateColumns: "2.5rem 5rem",
      gridTemplateRows: "2.5rem 2.5rem",
    },
    specialValueContainerPAlt: {
      fontSize: "1rem",
    },
    specialValueContainerP: {
      fontSize: "2.5rem",
    },
  },
  md: {
    card: {
      width: "16rem",
      borderWidth: "3px",
      padding: "0.5rem .5rem"
    },
    cardRow: {
      paddingBlock: "0.4rem",
    },
    cardRowTrait: {
      paddingBlock: "0.25rem",
    },
    costContainer: {
      width: "1.6rem",
      height: "1.6rem",
      borderRadius: "0.2rem",
    },
    costContainerP: {
      fontSize: "0.9rem",
    },
    valueContainer: {
      width: "1.6rem",
      height: "1.6rem",
      borderRadius: "0.2rem",
    },
    valueContainerP: {
      fontSize: "0.9rem",
    },
    rarityContainer: {
      padding: "0.4rem 1.5rem",
      borderRadius: "0.3rem",
    },
    rarityContainerP: {
      fontSize: "0.9rem",
    },
    elementImage: {
      width: "9rem",
      borderWidth: "0.3rem",
    },
    cardTitle: {
      fontSize: "1rem",
      lineHeight: "1rem",
    },
    cardTrait: {
      padding: "0.2rem 0.8rem",
      fontSize: "0.6rem",
    },
    cardStrongContainer: {
      gap: "0.25rem",
    },
    cardStrongContainerBefore: {
      borderLeft: ".3rem solid transparent",
      borderRight: ".3rem solid transparent",
      borderBottom: ".6rem solid green",
    },
    cardWeakContainer: {
      gap: "0.25rem",
    },
    cardWeakContainerAfter: {
      borderLeft: ".3rem solid transparent",
      borderRight: ".3rem solid transparent",
      borderTop: ".6rem solid red",
    },
    cardAffinityP: {
      fontSize: "0.9rem",
    },
    specialCard: {
      height: "5rem",
      borderRadius: "0.3rem",
      padding: "0.4rem",
    },
    specialName: {
      fontSize: "0.8rem",
    },
    specialType: {
      fontSize: "0.55rem",
    },
    specialDetailsContainer: {
      gridTemplateColumns: "2.1rem 4.2rem",
      gridTemplateRows: "2.1rem 2.1rem",
    },
    specialValueContainerPAlt: {
      fontSize: "0.9rem",
    },
    specialValueContainerP: {
      fontSize: "2rem",
    },
  },
  sm: {
    card: {
      width: "13rem",
      borderWidth: "2px",
      padding: ".5rem .5rem"
    },
    cardRow: {
      paddingBlock: "0.3rem",
    },
    cardRowTrait: {
      paddingBlock: "0.2rem",
    },
    costContainer: {
      width: "1.4rem",
      height: "1.4rem",
      borderRadius: "0.15rem",
    },
    costContainerP: {
      fontSize: "0.75rem",
    },
    valueContainer: {
      width: "1.4rem",
      height: "1.4rem",
      borderRadius: "0.15rem",
    },
    valueContainerP: {
      fontSize: "0.75rem",
    },
    rarityContainer: {
      padding: "0.3rem 1rem",
      borderRadius: "0.2rem",
    },
    rarityContainerP: {
      fontSize: "0.75rem",
    },
    elementImage: {
      width: "7rem",
      borderWidth: "0.2rem",
    },
    cardTitle: {
      fontSize: "0.9rem",
      lineHeight: "0.9rem",
    },
    cardTrait: {
      padding: "0.1rem 0.6rem",
      fontSize: "0.5rem",
    },
    cardStrongContainer: {
      gap: "0.2rem",
    },
    cardStrongContainerBefore: {
      borderLeft: ".25rem solid transparent",
      borderRight: ".25rem solid transparent",
      borderBottom: ".5rem solid green",
    },
    cardWeakContainer: {
      gap: "0.2rem",
    },
    cardWeakContainerAfter: {
      borderLeft: ".25rem solid transparent",
      borderRight: ".25rem solid transparent",
      borderTop: ".5rem solid red",
    },
    cardAffinityP: {
      fontSize: "0.75rem",
    },
    specialCard: {
      height: "4rem",
      borderRadius: "0.25rem",
      padding: "0.3rem",
    },
    specialName: {
      fontSize: "0.7rem",
    },
    specialType: {
      fontSize: "0.5rem",
    },
    specialDetailsContainer: {
      gridTemplateColumns: "1.7rem 3.4rem",
      gridTemplateRows: "1.7rem 1.7rem",
    },
    specialValueContainerPAlt: {
      fontSize: "0.8rem",
    },
    specialValueContainerP: {
      fontSize: "1.5rem",
    },
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

const Card = ({ card }) => {
  const elementColor = elements[card.element].color;
  const typeColor = types[card.type].color;
  const size = useCardSize();
  const styles = CARD_SIZES[size];

  return (
    <div className="card-wrapper">
      <div
        className="card"
        style={{
          border: styles.card.borderWidth + " solid " + elementColor,
          backgroundColor: basicBG,
          width: styles.card.width,
          padding: styles.card.padding
        }}
      >
        <div style={styles.cardRow} className="card-row">
          <div
            className="cost-container"
            style={{
              backgroundColor: costColor,
              width: styles.costContainer.width,
              height: styles.costContainer.height,
              borderRadius: styles.costContainer.borderRadius,
            }}
          >
            <p
              style={{
                color: basicText,
                fontSize: styles.costContainerP.fontSize,
              }}
            >
              {card.cost}
            </p>
          </div>
          <div
            className="rarity-container"
            style={{
              borderColor: basicText,
              padding: styles.rarityContainer.padding,
              borderRadius: styles.rarityContainer.borderRadius,
            }}
          >
            <p
              style={{
                color: basicText,
                fontSize: styles.rarityContainerP.fontSize,
              }}
            >
              {card.rarity.toUpperCase()}
            </p>
          </div>
          <div
            className="value-container"
            style={{
              backgroundColor: typeColor,
              width: styles.valueContainer.width,
              height: styles.valueContainer.height,
              borderRadius: styles.valueContainer.borderRadius,
            }}
          >
            <p
              style={{
                color: basicText,
                fontSize: styles.valueContainerP.fontSize,
              }}
            >
              {card.value}
            </p>
          </div>
        </div>
        <div
          className="card-row"
          style={{
            justifyContent: "center",
            paddingBlock: styles.cardRow.paddingBlock,
          }}
        >
          <img
            src={elements[card.element].logo}
            alt={card.element}
            style={{
              borderColor: basicCard,
              width: styles.elementImage.width,
              borderWidth: styles.elementImage.borderWidth,
            }}
            className="element-image"
          />
        </div>
        <div
          className="card-row"
          style={{
            justifyContent: "center",
            paddingBlock: styles.cardRow.paddingBlock,
          }}
        >
          <p
            className="card-title"
            style={{
              color: basicText,
              fontSize: styles.cardTitle.fontSize,
              lineHeight: styles.cardTitle.lineHeight,
            }}
          >
            {card.name.replaceAll("_", " ")}
          </p>
        </div>
        <div
          className="card-row"
          style={{
            justifyContent: "center",
            paddingBlock: styles.cardRowTrait.paddingBlock,
          }}
        >
          <p
            className="card-trait"
            style={{
              color: basicText,
              padding: styles.cardTrait.padding,
              fontSize: styles.cardTrait.fontSize,
            }}
          >
            {card.trait}
          </p>
        </div>
        <div style={styles.cardRow} className="card-row">
          <div
            style={styles.cardStrongContainer}
            className="card-strong-container"
          >
            <p
              style={{
                color: basicText,
                fontSize: styles.cardAffinityP.fontSize,
              }}
            >
              {card.affinity.strongAgainst}
            </p>
          </div>
          <div style={styles.cardWeakContainer} className="card-weak-container">
            <p
              style={{
                color: basicText,
                fontSize: styles.cardAffinityP.fontSize,
              }}
            >
              {card.affinity.weakAgainst}
            </p>
          </div>
        </div>

        <div
          className="card-row special-card"
          style={{
            backgroundColor: basicCard,
            // paddingBlock: size.cardRow.paddingBlock,
            height: styles.specialCard.height,
            padding: styles.specialCard.padding,
            borderRadius: styles.specialCard.borderRadius
          }}
        >
          {!card.special ? (
            <p
              className="no-special"
              style={{
                color: basicText,
                fontSize: styles.specialValueContainerPAlt.fontSize,
              }}
            >
              No Special Effect
            </p>
          ) : (
            <>
              <div className="special-text-container">
                <p
                  className="special-name"
                  style={{
                    color: basicText,
                    fontSize: styles.specialName.fontSize,
                  }}
                >
                  {card.special.name.toUpperCase().replaceAll("_", " ")}
                </p>
                <p
                  className="special-type"
                  style={{
                    color: basicText,
                    fontSize: styles.specialType.fontSize,
                  }}
                >
                  {card.special.type.toUpperCase().replaceAll("_", " ")}
                </p>
              </div>
              <div style={styles.specialDetailsContainer} className="special-detials-container">
                <div
                  className="special-cost-container"
                  style={{ backgroundColor: costColor }}
                >
                  <p
                    style={{
                      color: basicText,
                      fontSize: styles.specialValueContainerPAlt.fontSize,
                    }}
                  >
                    {card.cost}
                  </p>
                </div>
                <div
                  className="special-duration-container"
                  style={{ backgroundColor: durationColor }}
                >
                  <p
                    style={{
                      color: basicText,
                      fontSize: styles.specialValueContainerPAlt.fontSize,
                    }}
                  >
                    {card.duration ? card.duration : "∞"}
                  </p>
                </div>
                <div
                  className="special-value-container"
                  style={{ backgroundColor: typeColor }}
                >
                  <p
                    style={{
                      color: basicText,
                      fontSize: styles.specialValueContainerP.fontSize,
                    }}
                  >
                    {card.value}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
