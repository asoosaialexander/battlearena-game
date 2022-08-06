import { Box, Card, Divider, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import PlayerArea from "./PlayerArea";
import EnemyArea from "./EnemyArea";
import PlayerHand from "./playerHand";
import CardDeck from "./cardDeck";
import PlayerHero from "./playerHero";
import CardsSelectionModal from "./CardsSelectionModal";
import { MAGE_DECK, WARRIOR_DECK } from "./data";

export default function ArenaLayout({ ctx, G, moves }) {
  const self = 0;
  const enemy = 1;

  return (
    <Box>
      <Card sx={{ m: 1, p: 1, boxShadow: 1 }}>
        <Grid container direction={"row"} sx={{ alignItems: "center" }}>
          <Grid item xs={3}>
            <PlayerHero player={enemy} game={G} />
          </Grid>
          <Grid item xs>
            <PlayerHand player={enemy} game={G} />
          </Grid>
          <Grid item xs={1}>
            <CardDeck player={enemy} game={G} />
          </Grid>
        </Grid>
      </Card>
      <Card sx={{ m: 1, boxShadow: 1 }}>
        <EnemyArea />
        <Divider />
        <PlayerArea player={self} game={G} context={ctx} moves={moves} />
      </Card>
      <Card sx={{ m: 1, p: 1, boxShadow: 1 }}>
        <Grid container direction={"row"} sx={{ alignItems: "center" }}>
          <Grid item xs={3}>
            <PlayerHero player={self} game={G} />
          </Grid>
          <Grid item xs>
            <PlayerHand player={self} game={G} moves={moves} />
            <CardsSelectionModal game={G} context={ctx} moves={moves} />
          </Grid>
          <Grid item xs={1}>
            <CardDeck player={self} game={G} moves={moves} />
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}
