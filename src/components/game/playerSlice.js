import { createSlice } from "@reduxjs/toolkit";
import CoreNeutral from "../../data/core-neutral.json";
import { v4 as uuidv4 } from "uuid";
import { CoinFace, Mechanics } from "../common/constants";
import { shuffle, tossACoin } from "../common/CommonMethods";
import { Coin } from "../common/generatedCards";

const initialState = {
  self: {
    isFirstPlayer: true,
    handCards: [],
    deckCards: [],
    selectionCards: [],
  },
  enemy: {
    isFirstPlayer: false,
    handCards: [],
    deckCards: CoreNeutral.filter(
      (card) => card.mechanics && card.mechanics.includes(Mechanics.Taunt)
    ),
  },
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    loadDeck: (state, action) => {
      const person = state[action.payload.player];
      const { cards } = action.payload.deck;
      person.deckCards = [];
      person.selectionCards = [];
      shuffle(cards);
      for (const card of cards) {
        person.deckCards.push({ ...card, uniqueId: uuidv4(), isMarked: false });
      }
      //Select First Player
      if (tossACoin() === CoinFace.Tails) {
        state.self.isFirstPlayer = false;
        state.enemy.isFirstPlayer = true;
      }
      //Set Initial Cards
      const index = Math.floor(Math.random() * person.deckCards.length);
      let i = person.isFirstPlayer ? 3 : 4;
      while (i > 0) {
        const drawCard = person.deckCards[index];
        person.deckCards.splice(index, 1);
        person.selectionCards.push(drawCard);
        i--;
      }
    },
    markCard: (state, action) => {
      const person = state[action.payload.player];
      const card = action.payload.card;
      const index = person.selectionCards.findIndex(
        (c) => c.uniqueId === card.uniqueId
      );
      if (index > -1)
        person.selectionCards[index].isMarked =
          !person.selectionCards[index].isMarked;
    },
    drawInitialCards: (state, action) => {
      const person = state[action.payload];
      const markedCards = person.selectionCards.filter((c) => c.isMarked);

      // Add removed cards to the deck
      for (const card of markedCards) {
        person.deckCards.push(card);
      }
      // Add selected cards to the hand
      const selectedCards = person.selectionCards.filter((c) => !c.isMarked);
      for (const card of selectedCards) {
        person.handCards.push(card);
      }
      // Get Remaining card count to be added to player
      let i = (person.isFirstPlayer ? 3 : 4) - person.handCards.length;

      while (i > 0) {
        const index = Math.floor(Math.random() * person.deckCards.length);
        const drawCard = person.deckCards[index];
        person.deckCards.splice(index, 1);
        person.handCards.push(drawCard);
        i--;
      }

      // Give a coin to Second Player
      if (!person.isFirstPlayer) person.handCards.push(Coin);

      person.selectionCards = [];
    },
    drawCard: (state, action) => {
      const person = state[action.payload];
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
export const selectSelfDeck = (state) => state.player.self.deckCards;
export const selfSelectedCards = (state) => state.player.self.selectionCards;
export const selectEnemyHand = (state) => state.player.enemy.handCards;
export const selfDeckCardCount = (state) => state.player.self.deckCards.length;
export const enemyDeckCardCount = (state) =>
  state.player.enemy.deckCards.length;

export const { loadDeck, markCard, drawInitialCards, drawCard, playCard } =
  playerSlice.actions;

export default playerSlice.reducer;
