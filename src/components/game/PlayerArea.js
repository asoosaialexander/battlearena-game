import React from "react";
import Minion from "./Minion";
import { Grid } from "@mui/material";
import { selectSelfMinions } from "./playAreaSlice";
import { useSelector } from "react-redux";

export default function PlayerArea() {
  const playerMinions = useSelector(selectSelfMinions);

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
        return <Minion key={card.uniqueId} card={card} player="self" />;
      })}
    </Grid>
  );
}
