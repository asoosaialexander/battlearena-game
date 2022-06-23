import { Box, Card, Divider, Grid } from "@mui/material";
import React, { useState } from "react";
import PlayerArea from "./PlayerArea";
import EnemyArea from "./EnemyArea";
import PlayerHand from "./playerHand";
import CardDeck from "./cardDeck";
import PlayerHero from "./playerHero";
import HearthstoneJSON from "hearthstonejson-client";
import CardsSelectionModal from "./CardsSelectionModal";

export default function ArenaLayout() {
  const [open, setOpen] = useState(true);
  var hsjson = new HearthstoneJSON();

  // get the latest data
  hsjson.getLatest("enUS").then((cards) => {
    console.log(
      cards.filter(
        (card) =>
          card.set === "CORE" &&
          card.cardClass === "PALADIN" &&
          (card.type === "MINION" || card.type === "SPELL")
      )
    );
  });

  return (
    <Box>
      <Card sx={{ m: 1, p: 1, boxShadow: 1 }}>
        <Grid container direction={"row"} sx={{ alignItems: "center" }}>
          <Grid item xs={3}>
            <PlayerHero />
          </Grid>
          <Grid item xs>
            <PlayerHand player="enemy" />
          </Grid>
          <Grid item xs={1}>
            <CardDeck player="enemy" />
          </Grid>
        </Grid>
      </Card>
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
            <PlayerHand player="self" />
            <CardsSelectionModal isOpen={open} handleClose={setOpen} />
          </Grid>
          <Grid item xs={1}>
            <CardDeck player="self" />
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}
