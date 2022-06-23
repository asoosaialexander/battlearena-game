import React from "react";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { CardType } from "./../common/constants";
import MinionCard from "./MinionCard";
import SpellCard from "./SpellCard";
import { selectSelfHand, selectEnemyHand } from "./playerSlice";

export default function PlayerHand(props) {
  const { player } = props;
  const playerCards = useSelector(
    player === "self" ? selectSelfHand : selectEnemyHand
  );

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: "260px" }}
    >
      {playerCards.map((card) => {
        switch (card.type) {
          case CardType.Spell:
            return <SpellCard key={card.uniqueId} card={card} player={player} />;
          default:
            return <MinionCard key={card.uniqueId} card={card} player={player} />;
        }
      })}
    </Grid>
  );
}
