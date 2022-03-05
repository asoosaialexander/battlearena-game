import { Paper, Typography } from "@mui/material";
import React from "react";
import "./Card.css";
import CardImg from "./card-sprite.png";

export default function MinionCard(props) {
  const { name, cost, attack, health, deck, type, subType, description } =
    props.card;

  return (
    <Paper elevation={0} sx={{ position: "relative" }}>
      <img className="commonMinion" src={CardImg} alt="Icons" />
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
      <Typography className="minionText">
        <p>{description}</p>
      </Typography>
    </Paper>
  );
}
