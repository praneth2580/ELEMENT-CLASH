import logo from "./logo.svg";
import "./App.css";
import ElementClash from "./pages/Game";
import GameDev from "./pages/GameDev";
import CardGenerator from "./pages/CardGenerator";
import CardsDemo from "./pages/CardsDemo";
import { HashRouter, Route, Routes } from "react-router-dom";
import MenuScreen from "./pages/Menu";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MenuScreen />} />
        <Route path="/game" element={<ElementClash />} />
        <Route path="/dev" element={<ElementClash dev/>} />
        <Route path="/gen" element={<CardGenerator />} />
        <Route path="/demo" element={<CardsDemo />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
