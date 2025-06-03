import React, { useEffect, useState, useRef } from "react";
import TurnStatsModal from "../components/TurnStats";

function LogSection({ entity, autoScroll, logs }) {
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    if (autoScroll && containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs, autoScroll]);

  // Function to get color class based on log content
  const getLogColorClass = (log) => {
    const lower = log.toLowerCase();
    if (lower.includes("damage")) return "text-red-400";
    if (lower.includes("heal")) return "text-green-400";
    if (lower.includes("shield")) return "text-blue-400";
    if (lower.includes("aura")) return "text-yellow-400";
    if (lower.includes("card played")) return "text-purple-400";
    return "text-gray-300"; // default color
  };

  return (
    <div
      className="flex-1 p-2 border rounded bg-gray-800 text-white shadow max-h-[80vh] overflow-y-auto"
      ref={containerRef}
    >
      <h2 className="text-lg font-bold mb-2 capitalize border-b pb-1 border-gray-600">
        {entity} Logs
      </h2>
      {logs.length === 0 ? (
        <div className="text-gray-400">No logs found.</div>
      ) : (
        logs.map((log, index) => (
          <div
            key={index}
            className={`text-sm whitespace-pre-wrap ${getLogColorClass(log)}`}
          >
            {log}
          </div>
        ))
      )}
    </div>
  );
}

export default function LogViewer() {
  const [autoScroll, setAutoScroll] = useState(true);
  const [playerLogs, setPlayerLogs] = useState([]);
  const [aiLogs, setAiLogs] = useState([]);
  const [showStats, setShowStats] = useState(false);

  const loadLogs = () => {
    const playerData = localStorage.getItem("log_player");
    const aiData = localStorage.getItem("log_ai");
    setPlayerLogs(playerData ? JSON.parse(playerData) : []);
    setAiLogs(aiData ? JSON.parse(aiData) : []);
  };

  React.useEffect(() => {
    loadLogs();

    const onStorageChange = (event) => {
      if (event.key === "log_player" || event.key === "log_ai") {
        loadLogs();
      }
    };

    window.addEventListener("storage", onStorageChange);

    return () => {
      window.removeEventListener("storage", onStorageChange);
    };
  }, []);

  const handleClear = () => {
    localStorage.removeItem("log_player");
    localStorage.removeItem("log_ai");
    loadLogs();
  };

  const handleRefresh = () => {
    loadLogs();
  };

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 mb-4 items-center">
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={handleClear}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded shadow"
          >
            Clear Logs
          </button>
          <button
            onClick={handleRefresh}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded shadow"
          >
            Refresh Logs
          </button>
          <button
            onClick={() => setAutoScroll(!autoScroll)}
            className={`px-4 py-1 rounded shadow ${
              autoScroll
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-600 hover:bg-gray-700"
            }`}
          >
            Auto-Scroll {autoScroll ? "ON" : "OFF"}
          </button>
          <button
            onClick={() => setShowStats(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
          >
            View Turn Stats
          </button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
        <LogSection entity="player" autoScroll={autoScroll} logs={playerLogs} />
        <LogSection entity="ai" autoScroll={autoScroll} logs={aiLogs} />
      </div>

      <TurnStatsModal show={showStats} onClose={() => setShowStats(false)} />
    </div>
  );
}
