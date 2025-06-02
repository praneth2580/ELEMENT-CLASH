import React, { useState } from "react";
import { elements, generationConfig } from "../config";

const getDefaultBiasConfig = () => {
  const bias = {};
  for (const element in elements) {
    bias[element] = { Attack: 1, Defend: 1, Heal: 1 };
  }
  return bias;
};

export default function ConfigEditor({ onSave }) {
  const [localConfig, setLocalConfig] = useState(() => ({
    elementBias: structuredClone(generationConfig.elementBias || getDefaultBiasConfig()),
    specialEffectProbabilityByType: { ...generationConfig.specialEffectProbabilityByType },
  }));

  const [openSections, setOpenSections] = useState({ elementBias: false, specialEffects: false });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleBiasChange = (element, type, value) => {
    setLocalConfig((prev) => ({
      ...prev,
      elementBias: {
        ...prev.elementBias,
        [element]: {
          ...prev.elementBias[element],
          [type]: parseFloat(value),
        },
      },
    }));
  };

  const handleTypeProbabilityChange = (type, value) => {
    setLocalConfig((prev) => ({
      ...prev,
      specialEffectProbabilityByType: {
        ...prev.specialEffectProbabilityByType,
        [type]: parseFloat(value),
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalConfig = {
      ...generationConfig,
      elementBias: localConfig.elementBias,
      specialEffectProbabilityByType: localConfig.specialEffectProbabilityByType,
    };
    onSave(finalConfig);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-6 max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-md">
      <h2 className="text-3xl font-extrabold text-center text-gray-800 dark:text-white mb-6">Edit Game Configuration</h2>

      {/* Element Bias Section */}
      <div className="border rounded-lg overflow-hidden">
        <button
          type="button"
          className="w-full px-4 py-3 text-left text-lg font-semibold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          onClick={() => toggleSection("elementBias")}
        >
          Element Bias Multipliers
        </button>
        {openSections.elementBias && (
          <div className="p-4 space-y-4">
            {Object.entries(localConfig.elementBias).map(([element, biases]) => (
              <div key={element} className="mb-4">
                <h4 className="font-semibold text-gray-600 dark:text-gray-300 mb-2">{element}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(biases).map(([type, value]) => (
                    <label key={type} className="flex flex-col items-start">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">{type}</span>
                      <input
                        type="range"
                        min={0}
                        max={3}
                        step={0.1}
                        value={value}
                        onChange={(e) => handleBiasChange(element, type, e.target.value)}
                        className="w-full accent-blue-500"
                      />
                      <span className="text-xs text-gray-500 mt-1">{value.toFixed(1)}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Special Effect Probability Section */}
      <div className="border rounded-lg overflow-hidden">
        <button
          type="button"
          className="w-full px-4 py-3 text-left text-lg font-semibold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          onClick={() => toggleSection("specialEffects")}
        >
          Special Effect Probability by Type
        </button>
        {openSections.specialEffects && (
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(localConfig.specialEffectProbabilityByType).map(([type, value]) => (
              <label key={type} className="flex flex-col items-start">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">{type}</span>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={value}
                  onChange={(e) => handleTypeProbabilityChange(type, e.target.value)}
                  className="w-full accent-green-500"
                />
                <span className="text-xs text-gray-500 mt-1">{value.toFixed(2)}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="text-center">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow"
        >
          Save Configuration
        </button>
      </div>
    </form>
  );
}
