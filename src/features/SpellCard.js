import { Paper, Typography } from "@mui/material";
import React from "react";
import "./Card.css";
import CardImg from "./images/card-sprite.png";

export default function SpellCard(props) {
  const { name, cost, deck, type, subType, description } = props.card;
  return (
    <Paper elevation={0} sx={{ position: "relative" }}>
      <img className="commonSpell" src={CardImg} alt="Icons" />
      <Typography variant="body" className="spellCost single">
        {cost}
      </Typography>
      <Typography variant="body" className="spellName">
        {name}
      </Typography>
      <Typography className="spellText">
        <p>{description}</p>
      </Typography>
    </Paper>
  );
}
