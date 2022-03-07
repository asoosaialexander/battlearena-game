import { configureStore } from "@reduxjs/toolkit";
import playAreaReducer from "./../game/playAreaSlice";
import playerReducer from "../game/playerSlice";

export const store = configureStore({
  reducer: {
    playArea: playAreaReducer,
    player: playerReducer,
  },
});
