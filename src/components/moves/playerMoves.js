export const OverloadMana = (G, ctx, amount) => {
  const mana = G.players[ctx.currentPlayer].mana;
  mana.overload += amount;
};
