export const setMana = (G, ctx) => {
  const mana = G.players[ctx.currentPlayer].mana;
  mana.total = mana.total < mana.max ? mana.total + 1 : mana.max;
  mana.available = mana.total - mana.overload;
  mana.overload = 0;
};

export const readyMinions = (G, ctx) => {
  const minions = G.players[ctx.currentPlayer].minions;
  for (let index = 0; index < minions.length; index++) {
    minions[index].isReady = true;
    minions[index].isActivated = false;
  }
};

export const endTurn = (G, ctx) => {
  ctx.events.endTurn();
};
