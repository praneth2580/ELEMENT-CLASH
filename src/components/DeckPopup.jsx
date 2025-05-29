import Deck from "./Deck";

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
                <div key={idx} className="w-32 h-fill">
                  <Deck
                    onClick={() => selectDeck(deck.cards)}
                    key={deck.id}
                    type={deck.type}
                    name={deck.name}
                    color={deck.fg_color}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
