import { CardType, Mechanics } from "../common/constants";
import { Coin } from "../common/generatedCards";
import { v4 as uuidv4 } from "uuid";

export const drawCard = (G, ctx) => {
  const player = G.players[ctx.currentPlayer];
  if (player.deck.length <= 0) {
    player.hero.health -= player.hero.fatigue;
    player.hero.fatigue += 1;
    if (player.hero.health <= 0) player.hero.isAlive = false;
  } else {
    const index = Math.floor(Math.random() * player.deck.length);
    const drawCard = player.deck[index];
    player.deck.splice(index, 1);
    //Draw card if the hand count is < 10
    if (player.cards.length < 10) player.cards.push(drawCard);
  }
};

export const playCard = (G, ctx, card, position) => {
  const player = G.players[ctx.currentPlayer];
  if (card.cost > player.mana.available) return console.log("Can't play card");
  if (player.minions.length < 7) {
    const cardIndex = player.cards.findIndex(
      (x) => x.uniqueId === card.uniqueId
    );
    if (cardIndex > -1) {
      // Only Charge Minion will be ready to be played immediately
      if (card.mechanics && card.mechanics.includes(Mechanics.Charge))
        card.isReady = true;

      if (card.type === CardType.Minion) {
        if (player.minions.length === 0) player.minions.push(card);
        else player.minions.splice(position, 0, card);
      }
      player.cards.splice(cardIndex, 1);
      player.mana.available -= card.cost;
    }
  }
};
export const useHeroPower = (G, ctx) => {};
export const attackWithMinion = (G, ctx) => {};
export const attackWithWeapon = (G, ctx) => {};
export const toggleCardSelection = (G, ctx, toggle) => {
  G.players[ctx.currentPlayer].selection.isOpen = toggle;
};

export const markCard = (G, ctx, card) => {
  const player = G.players[ctx.currentPlayer];
  const index = player.selection.cards.findIndex(
    (c) => c.uniqueId === card.uniqueId
  );
  if (index > -1)
    player.selection.cards[index].isMarked =
      !player.selection.cards[index].isMarked;
};

export const drawInitialCards = (G, ctx, playerId) => {
  const player = G.players[playerId];
  const markedCards = player.selection.cards.filter((c) => c.isMarked);

  // Add removed cards to the deck
  for (const card of markedCards) {
    player.deck.push(card);
  }
  // Add selected cards to the hand
  const selectedCards = player.selection.cards.filter((c) => !c.isMarked);
  for (const card of selectedCards) {
    player.cards.push(card);
  }
  // Get Remaining card count to be added to player
  let i = (playerId === G.firstPlayer ? 3 : 4) - player.cards.length;

  while (i > 0) {
    const index = Math.floor(Math.random() * player.deck.length);
    const drawCard = player.deck[index];
    player.deck.splice(index, 1);
    player.cards.push(drawCard);
    i--;
  }

  // Give a coin to Second Player
  if (playerId !== G.firstPlayer)
    player.cards.push({ ...Coin, uniqueId: uuidv4(), isMarked: false });

  player.selection.cards = [];
};

export const attackMinionWithMinion = (
  G,
  ctx,
  attackMinionId,
  defendMinionId
) => {
  const player = G.players[ctx.currentPlayer];
  const opponent = G.players[ctx.currentPlayer === "0" ? "1" : "0"];

  const sI = player.minions.findIndex((m) => m.uniqueId === attackMinionId);
  const eI = opponent.minions.findIndex((m) => m.uniqueId === defendMinionId);

  opponent.minions[eI].health -= player.minions[sI].attack;
  player.minions[sI].health -= opponent.minions[eI].attack;
  player.minions[sI].activated = true;

  player.minions = player.minions.filter((m) => m.health > 0);
  opponent.minions = opponent.minions.filter((m) => m.health > 0);

  //Logic for Poisonous Minion
  if (
    player.minions[sI] &&
    player.minions[sI].mechanics &&
    player.minions[sI].mechanics.includes(Mechanics.Poisonous)
  )
    opponent.minions.splice(eI, 1);

  if (
    opponent.minions[eI] &&
    opponent.minions[eI].mechanics &&
    opponent.minions[eI].mechanics.includes(Mechanics.Poisonous)
  )
    player.minions.splice(sI, 1);
};

export const attackHeroWithMinion = (G, ctx, minionId) => {
  const player = G.players[ctx.currentPlayer];
  const opponentHero = G.players[ctx.currentPlayer === "0" ? "1" : "0"].hero;

  const index = player.minions.findIndex((m) => m.uniqueId === minionId);
  opponentHero.health -= player.minions[index].attack;
  player.minions[index].activated = true;
};

export const attackMinionWithDamage = (G, ctx, minionId, damage) => {
  const opponent = G.players[ctx.currentPlayer === "0" ? "1" : "0"];
  const index = opponent.minions.findIndex((m) => m.id === minionId);

  opponent.minions[index].health -= damage;
  opponent.minions = opponent.minions.filter((m) => m.health > 0);
};

export const attackAllMinionsWithDamage = (G, ctx, damage) => {
  const opponent = G.players[ctx.currentPlayer === "0" ? "1" : "0"];

  for (var i = 0; i < opponent.minions.length; i++) {
    opponent.minions[i].health -= damage;
  }
  opponent.minions = opponent.minions.filter((m) => m.health > 0);
};

export const attackHeroWithDamage = (G, ctx, damage) => {
  const opponent = G.players[ctx.currentPlayer === "0" ? "1" : "0"];

  while (opponent.hero.armor > 0 && damage > 0) {
    damage--;
    opponent.hero.armor--;
  }

  if (damage > 0) {
    opponent.hero.health -= damage;
  }
};
