import React from "react";
import { ArrowUpRight, ArrowDownRight, X } from "lucide-react";

const getDelta = (prev, now) => {
  const diffs = {};
  for (const key in now) {
    if (typeof now[key] === "number" && typeof prev[key] === "number") {
      const change = now[key] - prev[key];
      if (change !== 0) diffs[key] = change;
    } else if (Array.isArray(now[key]) && Array.isArray(prev[key])) {
      if (now[key].length !== prev[key].length) {
        diffs[key] = `${prev[key].length} → ${now[key].length}`;
      }
    } else if (JSON.stringify(now[key]) !== JSON.stringify(prev[key])) {
      diffs[key] = { from: prev[key], to: now[key] };
    }
  }
  return diffs;
};

export default function TurnStatsModal({ isOpen, onClose, stats, entity }) {
  if (!isOpen || !stats || stats.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="w-full max-w-3xl max-h-[80vh] overflow-y-auto rounded-xl bg-zinc-900 text-white p-6 shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-zinc-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-2xl font-bold mb-4">{entity} Turn Change Log</h2>
        <div className="space-y-4">
          {stats.map((entry, index) => {
            const changes = getDelta(entry.previous, entry.now);
            return (
              <div key={index} className="border border-zinc-700 p-4 rounded-lg bg-zinc-800">
                <h3 className="text-lg font-semibold text-zinc-200">
                  Turn {index + 1} —{" "}
                  <span className="text-sm text-zinc-400">
                    {new Date(entry.timestamp).toLocaleString()}
                  </span>
                </h3>
                <ul className="mt-3 space-y-2 text-sm">
                  {Object.entries(changes).map(([key, value]) => (
                    <li key={key} className="flex items-center gap-2">
                      <span className="capitalize text-zinc-400 w-24">{key}</span>
                      {typeof value === "number" ? (
                        <span
                          className={`flex items-center gap-1 font-medium ${
                            value > 0 ? "text-green-400" : "text-red-400"
                          }`}
                        >
                          {value > 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                          {value > 0 ? `+${value}` : value}
                        </span>
                      ) : typeof value === "string" ? (
                        <span className="text-yellow-400 font-mono">{value}</span>
                      ) : (
                        <span className="text-blue-300">{JSON.stringify(value, null, 0)}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
