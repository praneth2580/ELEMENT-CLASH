import { useCardGameStorage } from "../data/hooks/useCardGameStorage";
import Card from "./Card";

export const DeckPopup = ({ isOpen, decks, selectDeck }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {/* Modal container */}
      <div className="bg-white w-full max-w-4xl mx-4 rounded-2xl shadow-xl overflow-hidden">
        {/* Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-6 gap-2">
            {decks.map((deck, idx) => (
                <div className="w-32 h-fill">
                  <Card
                    onClick={() => selectDeck(deck)}
                    deck={deck}
                    key={idx}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
