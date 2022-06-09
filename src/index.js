import React from "react";
import ReactDOM from "react-dom";
import "./fonts/BelweBoldBT.ttf";
import "./index.css";
import { store } from "./app/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import ArenaLayout from "./components/game/ArenaLayout";
import DeckBuilderLayout from "./components/deckBuilder/DeckBuilderLayout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import HeroSelectionlayout from "./components/deckBuilder/HeroSelectionModal";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/play" element={<ArenaLayout />} />
          <Route path="/collection" element={<DeckBuilderLayout />} />
          <Route path="/heroSelection" element={<HeroSelectionlayout />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
