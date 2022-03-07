import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import "./Card.css";

export default function SpellCard(props) {
  const { id, name, cost, text } = props.card;
  return (
    <Paper
      elevation={0}
      sx={{
        position: "relative",
        width: "233px",
        height: "329px",
        zoom: "80%",
      }}
    >
      <img
        className="spellImage"
        src={`https://art.hearthstonejson.com/v1/256x/${id}.jpg`}
        alt="CardGraphics"
      />
      <Box className="commonSpell"></Box>
      <Typography variant="body" className="spellCost single">
        {cost}
      </Typography>
      <Typography variant="body" className="spellName">
        {name}
      </Typography>
      <div
        className="spellText"
        dangerouslySetInnerHTML={{ __html: `<p>${text}</p>` }}
      />
    </Paper>
  );
}
