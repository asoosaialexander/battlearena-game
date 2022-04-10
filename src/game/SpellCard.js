import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import "./Card.css";
import { Spell } from "./common";
import { drawCard, playCard } from "./playerSlice";
import { clearDeadMinions, attackAllMinionsWithDamage } from "./playAreaSlice";

export default function SpellCard(props) {
  const { id, name, cost, text } = props.card;
  const player = props.player;
  const dispatch = useDispatch();

  const playSpell = (spellName) => {
    switch (spellName) {
      case Spell.ArcaneIntellect:
        for (var i = 0; i < 2; i++) {
          dispatch(drawCard(player));
        }
        break;
      case Spell.Flamestrike:
        dispatch(attackAllMinionsWithDamage({ damage: 5, player }));
        dispatch(clearDeadMinions());
        break;

      default:
        console.log("SPELL NOT FOUND");
    }

    dispatch(playCard({ card: props.card, player }));
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
