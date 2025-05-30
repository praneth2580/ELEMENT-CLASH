import React, { useState } from "react";

export default function Tabs({ tabs }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
      <div className="flex border-b border-gray-300">
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            onClick={() => setActiveIndex(index)}
            className={`px-4 py-2 -mb-px font-medium text-sm focus:outline-none
              ${
                activeIndex === index
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="p-4">
        {tabs[activeIndex] && tabs[activeIndex].content}
      </div>
    </div>
  );
}
