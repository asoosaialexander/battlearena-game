import { Grid } from "@mui/material";
import React from "react";
import MinionArea from "./MinionArea";
import {
  Frostbolt,
  ArcaneIntellect,
  Fireball,
  Polymorph,
  WaterElemental,
} from "./MageCards";
import {
  AcidicSwampOoze,
  BloodfenRaptor,
  SenjinShieldMasta,
} from "./CommonCards";

const CARD_DECK = [
  Frostbolt,
  ArcaneIntellect,
  Fireball,
  WaterElemental,
  Polymorph,
  AcidicSwampOoze,
  BloodfenRaptor,
  SenjinShieldMasta
];

export default function ArenaLayout() {
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <MinionArea cards={CARD_DECK} />
      </Grid>
    </>
  );
}

