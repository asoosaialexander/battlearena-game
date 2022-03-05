import { Paper, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CardBackImg from "./images/cardBack.png";
import { playerDeckCardCount } from "./playerSlice";
import { drawCard } from "./playerSlice";

export default function CardDeck() {
  const dispatch = useDispatch();
  const cardCount = useSelector(playerDeckCardCount);
  return (
    <Paper
      elevation={0}
      sx={{
        position: "relative",
        cursor: "pointer",
        border: "2px solid gold",
        borderRadius: 3,
        height: "220px",
        alignItems:"center"
      }}
      onClick={() => {
        if (cardCount > 0) dispatch(drawCard());
      }}
    >
      {cardCount < 1 && <Typography sx={{textAlign:"center", m:5}}>NO CARDS</Typography>}
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
