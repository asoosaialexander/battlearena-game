import React from "react";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { CardType } from "./common";
import MinionCard from "./MinionCard";
import SpellCard from "./SpellCard";
import { selectPlayerHand } from "./playerSlice";

export default function PlayerHand() {
  const playerCards = useSelector(selectPlayerHand);

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center" sx={{ minHeight: "260px"}}>
      {playerCards.map((card) => {
        switch (card.type) {
          case CardType.Spell:
            return <SpellCard card={card} />;
          default:
            return <MinionCard card={card} />;
        }
      })}
    </Grid>
  );
}
