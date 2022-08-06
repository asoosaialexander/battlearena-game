import { CardType, Mechanics } from "../common/constants";
import { Coin } from "../common/generatedCards";

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

export const playCard = (G, ctx, card) => {
  const player = G.players[ctx.currentPlayer];
  if (player.minions.length < 7) {
    if (card.type === CardType.Minion) player.minions.push(card);
    const cardIndex = player.cards.findIndex(
      (x) => x.uniqueId === card.uniqueId
    );
    player.cards.splice(cardIndex, 1);
  }
};
export const useHeroPower = (G, ctx) => {};
export const attackWithMinion = (G, ctx) => {};
export const attackWithWeapon = (G, ctx) => {};
export const toggleCardSelection = (G, ctx, toggle) => {
  G.cardSelectionIsActive = toggle;
};

export const markCard = (G, ctx, card) => {
  const player = G.players[ctx.currentPlayer];
  const index = player.selection.findIndex((c) => c.uniqueId === card.uniqueId);
  if (index > -1)
    player.selection[index].isMarked = !player.selection[index].isMarked;
};

export const drawInitialCards = (G, ctx) => {
  const player = G.players[ctx.currentPlayer];
  const markedCards = player.selection.filter((c) => c.isMarked);

  // Add removed cards to the deck
  for (const card of markedCards) {
    player.deck.push(card);
  }
  // Add selected cards to the hand
  const selectedCards = player.selection.filter((c) => !c.isMarked);
  for (const card of selectedCards) {
    player.cards.push(card);
  }
  // Get Remaining card count to be added to player
  let i = (ctx.currentPlayer === G.firstPlayer ? 3 : 4) - player.cards.length;

  while (i > 0) {
    const index = Math.floor(Math.random() * player.deck.length);
    const drawCard = player.deck[index];
    player.deck.splice(index, 1);
    player.cards.push(drawCard);
    i--;
  }

  // Give a coin to Second Player
  if (ctx.currentPlayer !== G.firstPlayer) player.cards.push(Coin);

  player.selection = [];
};

export const attackMinionWithMinion = (
  G,
  ctx,
  attackMinionId,
  defendMinionId
) => {
  const player = G.players[ctx.currentPlayer];
  const opponent = G.players[ctx.currentPlayer === "0" ? "1" : "0"];

  const sI = player.minions.findIndex((m) => m.id === attackMinionId);
  const eI = opponent.minions.findIndex((m) => m.id === defendMinionId);

  opponent.minions[eI].health -= player.minions[sI].attack;
  player.minions[sI].health -= opponent.minions[eI].attack;

  player.minions = player.minions.filter((m) => m.health > 0);
  opponent.minions = opponent.minions.filter((m) => m.health > 0);

  //Logic for Poisonous Minion
  if (player.minions[sI].mechanics?.includes(Mechanics.Poisonous))
    opponent.minions.splice(eI, 1);

  if (opponent.minions[eI].mechanics?.includes(Mechanics.Poisonous))
    player.minions.splice(sI, 1);
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
