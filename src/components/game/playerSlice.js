import { createSlice } from "@reduxjs/toolkit";
import CoreNeutral from "../../data/core-neutral.json";
import CoreMage from "../../data/core-mage.json";
import { Mechanics } from "../common/constants";

const initialState = {
  self: {
    handCards: [],
    deckCards: CoreMage,
  },
  enemy: {
    handCards: [],
    deckCards: CoreNeutral.filter(card=> card.mechanics && card.mechanics.includes(Mechanics.Taunt)),
  },
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    drawCard: (state, action) => {
      const person = state[action.payload]
      if (person.deckCards.length <= 0) {
        person.hero.health -= person.hero.fatigue;
        person.hero.fatigue += 1;
        if (person.hero.health <= 0) person.hero.isAlive = false;
      } else {
        const index = Math.floor(Math.random() * person.deckCards.length);
        const drawCard = person.deckCards[index];
        person.deckCards.splice(index, 1);
        //Draw card if the hand count is < 10
        if (person.handCards.length < 10) person.handCards.push(drawCard);
      }
    },
    playCard: (state, action) => {
      const person = state[action.payload.player];
      const cardIndex = person.handCards.findIndex(
        (card) => card.name === action.payload.card.name
      );
      person.handCards.splice(cardIndex, 1);
    },
  },
});

export const selectSelfHand = (state) => state.player.self.handCards;
export const selectEnemyHand = (state) => state.player.enemy.handCards;
export const selfDeckCardCount = (state) => state.player.self.deckCards.length;
export const enemyDeckCardCount = (state) => state.player.enemy.deckCards.length;

export const { drawCard, playCard } = playerSlice.actions;

export default playerSlice.reducer;
