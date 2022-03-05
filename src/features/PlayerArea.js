import React from "react";
import Minion from "./Minion";
import { Grid } from "@mui/material";
import { selectPlayerMinions } from "./playAreaSlice";
import { useSelector } from "react-redux";

export default function PlayerArea() {

  const playerMinions = useSelector(selectPlayerMinions);

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center" sx={{ minHeight: "220px"}}>
      {playerMinions.map((card) => {
        return <Minion card={card} />;
      })}
    </Grid>
  );
}
