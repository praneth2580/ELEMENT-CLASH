import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  RefreshCcw,
  Play,
  FlaskConical,
  Hammer,
  Sparkles,
  Download,
  Container,
  ChartLine,
} from "lucide-react";
import logo from "../assets/logo.png";

export default function MenuScreen() {
  const navigate = useNavigate();
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") console.log("PWA installation accepted");
    setDeferredPrompt(null);
    setShowInstallButton(false);
  };

  const handleReset = () => {
    console.log("Resetting progress...");
    localStorage.clear();
    window.location.reload();
  };

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const buttons = [
    { label: "Play Game", icon: <Play className="w-5 h-5" />, href: "/ELEMENT-CLASH/#/game" },
    { label: "Deck Builder", icon: <Container className="w-5 h-5" />, href: "/ELEMENT-CLASH/#/deck" },
    { label: "Dev Board", icon: <FlaskConical className="w-5 h-5" />, href: "/ELEMENT-CLASH/#/dev" },
    { label: "Deck Analysis", icon: <ChartLine className="w-5 h-5" />, href: "/ELEMENT-CLASH/#/analysis" },
    { label: "Card Builder", icon: <Hammer className="w-5 h-5" />, href: "/ELEMENT-CLASH/#/gen" },
    { label: "Card Showcase", icon: <Sparkles className="w-5 h-5" />, href: "/ELEMENT-CLASH/#/demo" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e1b4b] via-[#581c87] to-[#86198f] text-white flex flex-col items-center justify-center px-4 py-12">
      <div className="mb-10 flex flex-col items-center text-center">
        <img src={logo} alt="Element Clash Logo" className="w-28 h-28 md:w-36 md:h-36 object-contain animate-pulse" />
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mt-4 drop-shadow-xl">
          Element Clash
        </h1>
        <p className="text-md mt-2 text-white/70">Tactical. Elemental. Strategic.</p>
      </div>

      <div className="grid w-full max-w-md gap-4">
        {buttons.map(({ label, icon, href }) => (
          <a
            key={label}
            href={href}
            className="flex items-center justify-between px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-200 text-lg font-medium shadow-lg group"
          >
            <span className="flex items-center gap-3 group-hover:text-white/90">{icon} {label}</span>
            <span className="text-sm text-white/50 group-hover:text-white">→</span>
          </a>
        ))}

        {showInstallButton && (
          <button
            onClick={handleInstallClick}
            className="flex items-center justify-between px-6 py-4 rounded-2xl bg-green-500/20 hover:bg-green-500/30 backdrop-blur-sm transition-all duration-200 text-lg font-medium shadow-lg"
          >
            <span className="flex items-center gap-3">
              <Download className="w-5 h-5" /> Install App
            </span>
          </button>
        )}

        <button
          onClick={handleReset}
          className="flex items-center justify-between px-6 py-4 rounded-2xl bg-red-500/20 hover:bg-red-500/30 backdrop-blur-sm transition-all duration-200 text-lg font-medium shadow-lg"
        >
          <span className="flex items-center gap-3">
            <RefreshCcw className="w-5 h-5" /> Reset Progress
          </span>
        </button>
      </div>
    </div>
  );
}
