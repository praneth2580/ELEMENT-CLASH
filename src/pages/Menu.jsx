import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { RefreshCcw, Play, FlaskConical, Hammer, Sparkles } from "lucide-react";

export default function MenuScreen() {
  const navigate = useNavigate();

  const handleReset = useCallback(() => {
    // Custom reset logic (clear storage, reset state, etc.)
    localStorage.clear();
    alert("Game progress has been reset!");
  }, []);

  const buttons = [
    {
      label: "Play Game",
      icon: <Play className="w-5 h-5" />,
      href: "/ELEMENT-CLASH/#/game",
    },
    {
      label: "Dev Board",
      icon: <FlaskConical className="w-5 h-5" />,
      href: "/ELEMENT-CLASH/#/dev",
    },
    {
      label: "Card Builder",
      icon: <Hammer className="w-5 h-5" />,
      href: "/ELEMENT-CLASH/#/gen",
    },
    {
      label: "Card Showcase",
      icon: <Sparkles className="w-5 h-5" />,
      href: "/ELEMENT-CLASH/#/demo",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-800 via-purple-800 to-pink-700 text-white flex flex-col items-center justify-center px-4 py-8">
      {/* Game Logo */}
      <div className="mb-10 flex flex-col items-center">
        <img
          src="logo.png"
          alt="Element Clash Logo"
          className="w-32 h-32 md:w-40 md:h-40 object-contain"
        />
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mt-4 tracking-wide drop-shadow-lg">
          Element Clash
        </h1>
      </div>

      {/* Buttons Grid */}
      <div className="grid w-full max-w-md gap-4">
        {buttons.map(({ label, icon, href }) => (
          <a
            key={label}
            href={href}
            className="flex items-center justify-between px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all duration-200 text-lg font-medium shadow-md"
          >
            <span className="flex items-center gap-3">
              {icon}
              {label}
            </span>
            <span className="text-sm text-white/50">&rarr;</span>
          </a>
        ))}

        {/* Reset Button */}
        <button
          onClick={handleReset}
          className="flex items-center justify-between px-6 py-4 rounded-2xl bg-red-500/20 hover:bg-red-500/30 backdrop-blur-md transition-all duration-200 text-lg font-medium shadow-md"
        >
          <span className="flex items-center gap-3">
            <RefreshCcw className="w-5 h-5" />
            Reset Progress
          </span>
        </button>
      </div>
    </div>
  );
}
