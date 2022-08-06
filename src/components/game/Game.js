import { shuffle, tossACoin } from "../common/CommonMethods";
import { v4 as uuidv4 } from "uuid";
import { MAGE_DECK, WARRIOR_DECK } from "./data";
import {
  drawCard,
  playCard,
  useHeroPower,
  attackWithMinion,
  attackWithWeapon,
  toggleCardSelection,
  markCard,
  attackAllMinionsWithDamage,
  attackMinionWithDamage,
  attackMinionWithMinion,
  drawInitialCards,
} from "./MoveList";
import { CoinFace } from "../common/constants";

export const Hearthstone = {
  setup: () => {
    let players = [];
    players.push({
      energy: 0,
      hero: {
        attack: 0,
        armor: 0,
        health: 30,
        fatigue: 1,
        isAlive: true,
      },
      weapon: {},
      minions: [],
      cards: [],
      deck: [],
      selection: [],
    });
    players.push({
      energy: 0,
      hero: {
        attack: 0,
        armor: 0,
        health: 30,
        fatigue: 1,
        isAlive: true,
      },
      weapon: {},
      minions: [],
      cards: [],
      deck: [],
      selection: [],
    });

    const mageDeck = MAGE_DECK;
    const warriorDeck = WARRIOR_DECK;

    shuffle(mageDeck);
    for (const card of mageDeck) {
      players[0].deck.push({ ...card, uniqueId: uuidv4(), isMarked: false });
    }

    shuffle(warriorDeck);
    for (const card of warriorDeck) {
      players[1].deck.push({ ...card, uniqueId: uuidv4(), isMarked: false });
    }

    //Select First Player
    const firstPlayer = tossACoin() === CoinFace.Heads ? "0" : "1";

    let i = firstPlayer === "0" ? 3 : 4;
    let j = firstPlayer === "1" ? 3 : 4;

    while (i > 0) {
      const index = Math.floor(Math.random() * players[0].deck.length);
      players[0].selection.push(players[0].deck[index]);
      players[0].deck.splice(index, 1);
      i--;
    }

    while (j > 0) {
      const index = Math.floor(Math.random() * players[1].deck.length);
      players[1].selection.push(players[1].deck[index]);
      players[1].deck.splice(index, 1);
      j--;
    }

    return {
      players,
      firstPlayer,
      cardSelectionIsActive: true,
    };
  },

  minPlayers: 2,
  maxPlayers: 2,

  moves: {
    drawCard,
    playCard,
    useHeroPower,
    attackWithMinion,
    attackWithWeapon,
    toggleCardSelection,
    markCard,
    drawInitialCards,
    attackMinionWithMinion,
    attackMinionWithDamage,
    attackAllMinionsWithDamage,
  },
};
