import React from "react";
import ReactDOM from "react-dom";
import "./fonts/BelweBoldBT.ttf";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import DeckBuilderLayout from "./components/deckBuilder/DeckBuilderLayout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import HeroSelectionlayout from "./components/deckBuilder/HeroSelectionModal";
import DeckSelection from "./components/game/DeckSelection";
import GameApp from "./components/game/GameApp";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/play" element={<GameApp />} />
        <Route path="/deckSelection" element={<DeckSelection />} />
        <Route path="/collection" element={<DeckBuilderLayout />} />
        <Route path="/heroSelection" element={<HeroSelectionlayout />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
