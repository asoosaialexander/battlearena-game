import { Paper, Typography } from "@mui/material";
import React from "react";
import CardBackImg from "./../../images/cardBack.png";

export default function CardDeck({ player, game, moves }) {
  const cardCount = game.players[player].deck.length;
  return (
    <Paper
      elevation={0}
      sx={{
        position: "relative",
        cursor: "pointer",
        border: "2px solid gold",
        borderRadius: 3,
        height: "220px",
        width: "149px",
        alignItems: "center",
      }}
      onClick={() => {
        if (cardCount > 0) moves.drawCard();
      }}
    >
      {cardCount < 1 && (
        <Typography sx={{ textAlign: "center", m: 5 }}>NO CARDS</Typography>
      )}
      {[...Array(cardCount * 3)].map((e, i) => (
        <img
          key={i}
          style={{
            position: "absolute",
            height: "220px",
            top: 0,
            left: `${i * 0.5}px`,
          }}
          src={CardBackImg}
          alt="cardBack"
        />
      ))}
    </Paper>
  );
}
