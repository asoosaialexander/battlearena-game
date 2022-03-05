import { Grid, Paper, Typography } from "@mui/material";
import React from "react";
import HeroFrame from "./../features/images/heroFrame.png";
import ArmorImg from "./../features/images/armor.webp";
import HeroPower from "./../features/images/heroPower.webp";
import "./Hero.css";

export default function PlayerHero() {
  const armor = 30;
  const health = 30;
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{ position: "relative" }}
      gap={1}
    >
      <Grid item sx={{ position: "relative" }}>
        <img className="frame" src={HeroFrame} alt="Hero" />
        <img className="armorImg" src={ArmorImg} alt="HeroArmor" />
        <Typography
          variant="body"
          className={armor > 9 ? "heroArmor double" : "heroArmor single"}
        >
          {armor}
        </Typography>
        <Typography
          variant="body"
          className={health > 9 ? "heroHealth double" : "heroHealth single"}
        >
          {health}
        </Typography>
      </Grid>
      <Grid item>
        <img className="frame" src={HeroPower} alt="Hero" />
      </Grid>
    </Grid>
  );
}
