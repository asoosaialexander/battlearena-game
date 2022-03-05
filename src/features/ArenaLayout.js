import { Box, Button, Card, Divider, Grid } from "@mui/material";
import React from "react";
import PlayerArea from "./PlayerArea";
import EnemyArea from "./EnemyArea";

import { useSelector, useDispatch } from "react-redux";
import { addPlayerMinion } from "./playAreaSlice";
import { selectPlayerHand } from "./playerSlice";
import { drawCard } from "./playerSlice";
import PlayerHand from "./playerHand";
import CardDeck from "./cardDeck";
import PlayerHero from "./playerHero";

export default function ArenaLayout() {
  return (
    <Box>
      <Card sx={{ m: 1, boxShadow: 1 }}>
        <EnemyArea />
        <Divider />
        <PlayerArea />
      </Card>
      <Card sx={{ m: 1, p: 1, boxShadow: 1 }}>
        <Grid container direction={"row"} sx={{ alignItems: "center" }}>
          <Grid item xs={3}>
            <PlayerHero />
          </Grid>
          <Grid item xs>
            <PlayerHand />
          </Grid>
          <Grid item xs={1}>
            <CardDeck />
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}
