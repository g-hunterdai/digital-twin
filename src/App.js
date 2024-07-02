import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "./style.css";
import LeftChartComponent from "./components/LeftChartComponent";
import LogoComponent from "./components/LogoComponent";
import RightChartComponent from "./components/RightChartComponent";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <LogoComponent />
      <LeftChartComponent />
      <RightChartComponent />
    </div>
  );
}

export default App;
