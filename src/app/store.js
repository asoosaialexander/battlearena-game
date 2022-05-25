import { configureStore } from "@reduxjs/toolkit";
import playAreaReducer from "../components/game/playAreaSlice";
import playerReducer from "../components/game/playerSlice";
import collectionReducer from "../components/deckBuilder/collectionSlice";
import { playerDeckApi } from "../services/playerDeck";

export const store = configureStore({
  reducer: {
    playArea: playAreaReducer,
    player: playerReducer,
    collection: collectionReducer,
    [playerDeckApi.reducerPath]: playerDeckApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(playerDeckApi.middleware),
});
