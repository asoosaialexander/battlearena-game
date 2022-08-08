import React from "react";
import { Grid } from "@mui/material";
import { CardType } from "./../common/constants";
import MinionCard from "./MinionCard";
import SpellCard from "./SpellCard";

export default function PlayerHand({ player, game, moves }) {
  const playerCards = game.players[player].cards;

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: "260px" }}
    >
      {playerCards.map((card) => {
        switch (card.type) {
          case CardType.Spell:
            return <SpellCard key={card.uniqueId} card={card} moves={moves} />;
          case CardType.Minion:
            return (
              <MinionCard
                key={card.uniqueId}
                card={card}
                player={player}
                game={game}
                moves={moves}
              />
            );
          default:
            return null;
        }
      })}
    </Grid>
  );
}
