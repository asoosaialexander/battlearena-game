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
  attackAllOpponentMinionsWithDamage,
  attackMinionWithDamage,
  attackMinionWithMinion,
  drawInitialCards,
  attackHeroWithMinion,
  attackHeroWithDamage,
} from "./MoveList";
import { setMana, readyMinions, endTurn } from "../moves/gameMoves";
import { CoinFace } from "../common/constants";
import { TurnOrder } from "boardgame.io/core";
import { playCoin } from "../moves/commonSpells";

export const Hearthstone = {
  setup: () => {
    let players = {};
    ["0", "1"].forEach((playerId) => {
      players[playerId] = {
        hero: {
          attack: 0,
          armor: 0,
          health: 30,
          fatigue: 1,
          isAlive: true,
        },
        mana: {
          max: 10,
          total: 0,
          available: 0,
          overload: 0,
        },
        weapon: {},
        minions: [],
        cards: [],
        deck: [],
        selection: {
          isOpen: false,
          cards: [],
        },
      };
    });

    const playerDeck = JSON.parse(localStorage.getItem("deck"));
    console.log(playerDeck);
    const warriorDeck = WARRIOR_DECK;

    shuffle(playerDeck.cards);
    for (const card of playerDeck.cards) {
      players["0"].deck.push({
        ...card,
        uniqueId: uuidv4(),
        isMarked: false,
        isReady: false,
        activated: false,
      });
    }

    shuffle(warriorDeck);
    for (const card of warriorDeck) {
      players["1"].deck.push({
        ...card,
        uniqueId: uuidv4(),
        isMarked: false,
        isReady: false,
        activated: false,
      });
    }

    //Select First Player
    const firstPlayer = tossACoin() === CoinFace.Heads ? "0" : "1";

    let i = firstPlayer === "0" ? 3 : 4;
    let j = firstPlayer === "1" ? 3 : 4;

    while (i > 0) {
      const index = Math.floor(Math.random() * players["0"].deck.length);
      players["0"].selection.cards.push(players["0"].deck[index]);
      players["0"].deck.splice(index, 1);
      i--;
    }

    while (j > 0) {
      const index = Math.floor(Math.random() * players["1"].deck.length);
      players["1"].selection.cards.push(players["1"].deck[index]);
      players["1"].deck.splice(index, 1);
      j--;
    }

    return {
      players,
      turnOrder: firstPlayer === "0" ? ["0", "1"] : ["1", "0"],
      firstPlayer,
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
    attackHeroWithMinion,
    attackMinionWithDamage,
    attackAllMinionsWithDamage,
    attackAllOpponentMinionsWithDamage,
    attackHeroWithDamage,
    setMana,
    readyMinions,
    endTurn,
    playCoin,
  },

  endIf: (G, ctx) => {
    if (G.players["0"].hero.health <= 0) {
      return { winner: ["1"] };
    }

    if (G.players["1"].hero.health <= 0) {
      return { winner: ["0"] };
    }
  },

  phases: {
    draw: {
      start: true,
      onBegin: (G, ctx) => {
        ["0", "1"].forEach((player) => {
          drawInitialCards(G, ctx, player);
        });
      },
      next: "play",
    },
    play: {
      moves: {},
    },
  },

  turn: {
    order: TurnOrder.CUSTOM_FROM("turnOrder"),
    onBegin: (G, ctx) => {
      drawCard(G, ctx);
      setMana(G, ctx);
      readyMinions(G, ctx);
    },
  },
};
