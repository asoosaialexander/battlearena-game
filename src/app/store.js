import { configureStore } from "@reduxjs/toolkit";
import playAreaReducer from "../components/game/playAreaSlice";
import playerReducer from "../components/game/playerSlice";

export const store = configureStore({
  reducer: {
    playArea: playAreaReducer,
    player: playerReducer,
  },
});
