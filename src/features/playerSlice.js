import { createSlice } from "@reduxjs/toolkit";
import {
  Frostbolt,
  ArcaneIntellect,
  Fireball,
  Polymorph,
  WaterElemental,
} from "./MageCards";
import {
  AcidicSwampOoze,
  BloodfenRaptor,
  SenjinShieldMasta,
} from "./CommonCards";

const initialState = {
  energy: 1,
  hero: {
    isAlive: true,
    attack: 0,
    health: 30,
    fatigue: 1,
  },
  handCards: [],
  deckCards: [
    Frostbolt,
    ArcaneIntellect,
    Fireball,
    Polymorph,
    WaterElemental,
    AcidicSwampOoze,
    BloodfenRaptor,
    SenjinShieldMasta,
  ],
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    drawCard: (state) => {
      if (state.deckCards.length <= 0) {
        state.hero.health -= state.hero.fatigue;
        state.hero.fatigue += 1;
        if (state.hero.health <= 0) state.hero.isAlive = false;
      } else {
        const index = Math.floor(Math.random() * state.deckCards.length);
        const drawCard = state.deckCards[index];
        state.deckCards.splice(index, 1);
        state.handCards.push(drawCard);
      }
    },
    playCard: (state, action) => {
      const cardIndex = state.handCards.findIndex(
        (card) => card.name === action.payload.name
      );
      state.handCards.splice(cardIndex, 1);
    },
  },
});

export const selectPlayerHand = (state) => state.player.handCards;
export const playerDeckCardCount = (state) => state.player.deckCards.length;
export const selectHero = (state) => state.player.hero;

export const { drawCard, playCard } = playerSlice.actions;

export default playerSlice.reducer;
