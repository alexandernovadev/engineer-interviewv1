import React from "react";
import { ChallengeComponent } from "./ChallengeComponent";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App__header">
        <div className="App__header-content">
          <h1 className="App__title">Welcome To The Every.io Code Challenge.</h1>
          <div className="App__prototype-link">
            <a
              target="_blank"
              href="https://www.figma.com/proto/kd49ArXbBt0vi1kBSLkmC1/Code-Challenge?node-id=1%3A2&scaling=min-zoom&page-id=0%3A1"
              className="App__prototype-button"
              rel="noreferrer"
            >
              Checkout the Prototype
            </a>
          </div>
        </div>
      </header>
      <main className="App__main">
        <ChallengeComponent />
      </main>
    </div>
  );
}

export default App;
