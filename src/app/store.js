import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import playAreaReducer from "./../features/playAreaSlice";
import playerReducer from "./../features/playerSlice";
import enemyReducer from "./../features/enemySlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    playArea: playAreaReducer,
    player: playerReducer,
    enemy: enemyReducer,
  },
});
