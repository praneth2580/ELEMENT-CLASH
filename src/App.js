import logo from "./logo.svg";
import "./App.css";
import ElementClash from "./pages/Game";
import GameDev from "./pages/GameDev";
import CardGenerator from "./pages/CardGenerator";
import CardsDemo from "./pages/CardsDemo";
import { HashRouter, Route, Routes } from "react-router-dom";
import MenuScreen from "./pages/Menu";
import DeckBuilder from "./pages/DeckBuilder";
import CardAnalysis from "./pages/CardAnalysis";
import LogViewer from "./pages/LogViewer";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MenuScreen />} />
        <Route path="/game" element={<ElementClash />} />
        <Route path="/logs" element={<LogViewer />} />
        <Route path="/deck" element={<DeckBuilder  />} />
        <Route path="/analysis" element={<CardAnalysis/>} />
        <Route path="/dev" element={<ElementClash dev/>} />
        <Route path="/gen" element={<CardGenerator />} />
        <Route path="/demo" element={<CardsDemo />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
