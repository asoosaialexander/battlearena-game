import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import "./Card.css";
import { playCard } from "./playerSlice";
import { playMinion } from "./playAreaSlice";
import { CardType } from "./common";

export default function MinionCard(props) {
  const { id, name, cost, attack, health, type, text } = props.card;
  const dispatch = useDispatch();

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
      onClick={() => {
        dispatch(playCard({ card: props.card, player: props.player }));
        if (type === CardType.Minion) {
          dispatch(playMinion({ card: props.card, player: props.player }));
        }
      }}
    >
      <img
        className="minionImage"
        src={`https://art.hearthstonejson.com/v1/256x/${id}.jpg`}
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
