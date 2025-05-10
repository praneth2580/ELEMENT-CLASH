import { useCardGameStorage } from "../data/hooks/useCardGameStorage";

export const DeckPopup = ({ isOpen, cards }) => {
  if (!isOpen) return null;

  const onClose = () => {};
  const onConfirm = () => {};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {/* Modal container */}
      <div className="bg-white w-full max-w-4xl mx-4 rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 gap-2 flex justify-end items-center">
          <h2 className="text-2xl font-semibold">title</h2>

          <button
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            onClick={onConfirm}
          >
            Confirm
          </button>
          <button
            className="text-gray-500 hover:text-gray-700 text-xl"
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto"></div>
      </div>
    </div>
  );
};
