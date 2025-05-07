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
    // <BrowserRouter basename="/ELEMENT-CLASH">
    //   <Routes>
    //     <Route path="/" element={<ElementClash />} />
    //     <Route path="/gen" element={<CardGenerator />} />
    //   </Routes>
    // </BrowserRouter>
    // <div className="App">
    //   {/* <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header> */}
    //   <ElementClash/>
    // </div>
  );
}

export default App;
