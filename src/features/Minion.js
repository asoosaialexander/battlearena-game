import { Paper, Typography } from "@mui/material";
import React from "react";
import "./Minion.css";
import MinionFrame from "./legendMinion.png";
import HealthImg from "./health.png";
import AttackImg from "./attack.png";

export default function Minion(props) {
  const { name, cost, attack, health, deck, type, subType, description } =
    props.card;
  console.log("alex alex", attack);
  return (
    <Paper elevation={0} sx={{ position: "relative" }}>
      <img className="frame" src={MinionFrame} alt="Icons" />
      <img className="attackImg" src={AttackImg} alt="Icons" />
      <Typography
        variant="body"
        className={attack > 9 ? "mAttack double" : "mAttack single"}
      >
        {attack}
      </Typography>
      <img className="healthImg" src={HealthImg} alt="Icons" />
      <Typography
        variant="body"
        className={health > 9 ? "mHealth double" : "mHealth single"}
      >
        {health}
      </Typography>
    </Paper>
  );
}
