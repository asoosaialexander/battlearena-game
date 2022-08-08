import { Grid } from "@mui/material";
import React from "react";
import Minion from "./Minion";

export default function EnemyArea({ player, context, game, moves }) {
  const enemyMinions = game.players[player].minions;

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: "220px" }}
    >
      {enemyMinions.map((card) => {
        return (
          <Minion
            game={game}
            key={card.uniqueId}
            card={card}
            context={context}
            moves={moves}
          />
        );
      })}
    </Grid>
  );
}
