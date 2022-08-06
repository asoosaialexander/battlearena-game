import React from "react";
import Minion from "./Minion";
import { Grid } from "@mui/material";

export default function PlayerArea({ player, game, context, moves }) {
  const playerMinions = game.players[context.currentPlayer].minions;

  return (
    <Grid
      gap={1}
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: "220px" }}
    >
      {playerMinions.map((card) => {
        return (
          <Minion
            game ={game}
            key={card.uniqueId}
            card={card}
            player={player}
            moves={moves}
          />
        );
      })}
    </Grid>
  );
}
