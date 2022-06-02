import React from "react";
import { Paper } from "@mui/material";
import { APIRoot } from "../common/constants";

export default function PlayerCard({ card, handleClick }) {
  return (
    <Paper key={card.id} elevation={0}>
      <img
        src={`${APIRoot}/render/latest/enUS/256x/${card.id}.png`}
        alt="CardGraphics"
        style={{ cursor: "pointer" }}
        onClick={() => handleClick(card)}
      />
    </Paper>
  );
}
