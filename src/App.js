import logo from "./logo.svg";
import "./App.css";
import ElementClash from "./pages/Game";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CardGenerator from "./pages/CardGenerator";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" Component={ElementClash} />
        <Route path="/gen" Component={CardGenerator} />
      </Routes>
    </BrowserRouter>
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
