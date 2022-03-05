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

export const enemySlice = createSlice({
  name: "enemy",
  initialState,
  reducers: {
    drawCard: (state) => {
      if (state.deckCards.length <= 0) {
        state.hero.health -= state.hero.fatigue;
        state.hero.fatigue += 1;
        if (state.hero.health <= 0) state.here.isAlive = false;
      } else {
        console.log(
          "ALEX::Selected Card",
          Math.floor(Math.random() * state.deckCards.length)
        );
        const drawCard =
          state.deckCards[Math.floor(Math.random() * state.deckCards.length)];
        state.handCards.push(drawCard);
      }
    },
  },
});

export const selectEnemyHand = (state) => state.enemy.handCards;

export const { addEnemyMinion } = enemySlice.actions;

export default enemySlice.reducer;
