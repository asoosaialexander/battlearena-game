import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import "./Card.css";
import { Spell } from "../common/constants";

export default function SpellCard({ card, player, game, moves }) {
  const { id, name, cost, text } = card;

  const playSpell = (spellName) => {
    switch (spellName) {
      case Spell.ArcaneIntellect:
        for (var i = 0; i < 2; i++) {
          moves.drawCard();
        }
        break;
      case Spell.Flamestrike:
        moves.attackAllOpponentMinionsWithDamage(5);
        break;
      case Spell.Coin:
        moves.playCoin();
        break;

      default:
        console.log("SPELL NOT FOUND");
    }

    moves.playCard(card);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        position: "relative",
        width: "233px",
        height: "329px",
        zoom: "80%",
        cursor: "pointer",
        "&:hover": {
          zoom: "120%",
        },
      }}
      onClick={() => playSpell(name)}
    >
      <img
        className="spellImage"
        src={`https://art.hearthstonejson.com/v1/256x/${id}.jpg`}
        alt="CardGraphics"
      />
      <Box className="commonSpell"></Box>
      <Typography variant="body" className="spellCost single">
        {cost}
      </Typography>
      <Typography variant="body" className="spellName">
        {name}
      </Typography>
      <div
        className="spellText"
        dangerouslySetInnerHTML={{ __html: `<p>${text}</p>` }}
      />
    </Paper>
  );
}
