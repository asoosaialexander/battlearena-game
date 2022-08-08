import React from "react";
import Minion from "./Minion";
import { Grid } from "@mui/material";

export default function PlayerArea({ player, context, game, moves }) {
  const playerMinions = game.players[player].minions;

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
            game={game}
            key={card.uniqueId}
            context={context}
            card={card}
            moves={moves}
          />
        );
      })}
    </Grid>
  );
}
