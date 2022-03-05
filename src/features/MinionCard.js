import { Paper, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import "./Card.css";
import CardImg from "./images/card-sprite.png";
import { playCard } from "./playerSlice";
import { addPlayerMinion } from "./playAreaSlice";
import { CardType } from "./common";

export default function MinionCard(props) {
  const { name, cost, attack, health, deck, type, subType, description } =
    props.card;
  const dispatch = useDispatch();

  return (
    <Paper
      elevation={0}
      sx={{ position: "relative", cursor: "pointer" }}
      onClick={() => {
        dispatch(playCard(props.card));
        if (type === CardType.Minion) {
          dispatch(addPlayerMinion(props.card));
        }
      }}
    >
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
