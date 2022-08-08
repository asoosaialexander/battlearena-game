import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import "./Card.css";
import { APIRoot } from "./../common/constants";

export default function MinionCard({ card, moves }) {
  const { id, name, cost, attack, health, text } = card;

  return (
    <Paper
      elevation={0}
      sx={{
        position: "relative",
        cursor: "pointer",
        width: "240px",
        height: "336px",
        zoom: "80%",
      }}
      onClick={() => moves.playCard(card)}
    >
      <img
        className="minionImage"
        src={`${APIRoot}/256x/${id}.jpg`}
        alt="CardGraphics"
      />
      <Box className="commonMinion"></Box>
      <Typography
        variant="body"
        className={cost > 9 ? "minionCost double" : "minionCost single"}
      >
        {cost}
      </Typography>
      <Typography
        variant="body"
        className={attack > 9 ? "minionAttack double" : "minionAttack single"}
      >
        {attack}
      </Typography>
      <Typography
        variant="body"
        className={health > 9 ? "minionHealth double" : "minionHealth single"}
      >
        {health}
      </Typography>
      <Typography variant="body" className="minionName">
        {name}
      </Typography>
      <div
        className="minionText"
        dangerouslySetInnerHTML={{ __html: `<p>${text}</p>` }}
      />
    </Paper>
  );
}
