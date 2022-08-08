export const playCoin = (G, ctx) => {
  G.players[ctx.currentPlayer].mana.available += 1;
};
