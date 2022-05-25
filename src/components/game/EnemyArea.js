import { Grid } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import Minion from "./Minion";
import { selectEnemyMinions } from "./playAreaSlice";

export default function EnemyArea() {
  const enemyMinions = useSelector(selectEnemyMinions);

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: "220px" }}
    >
      {enemyMinions.map((card) => {
        return <Minion key={card.id} card={card} player="enemy" />;
      })}
    </Grid>
  );
}
