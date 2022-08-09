import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import "./Card.css";
import { APIRoot } from "./../common/constants";
import PlayCardModal from "./PlayCardModal";

export default function MinionCard({ player, game, card, moves }) {
  const { id, name, cost, attack, health, text } = card;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          position: "relative",
          cursor: "pointer",
          width: "240px",
          height: "336px",
          zoom: "80%",
        }}
        onClick={() => {
          // Todo: show dialog only when minions present
          handleOpen();
        }}
      >
        <img
          className="minionImage"
          src={`${APIRoot}/256x/${id}.jpg`}
          alt="CardGraphics"
        />
        <Box className="commonMinion"></Box>
        <Typography
          variant="body"
          className={cost > 9 ? "minionCost double" : "minionCost single"}
        >
          {cost}
        </Typography>
        <Typography
          variant="body"
          className={attack > 9 ? "minionAttack double" : "minionAttack single"}
        >
          {attack}
        </Typography>
        <Typography
          variant="body"
          className={health > 9 ? "minionHealth double" : "minionHealth single"}
        >
          {health}
        </Typography>
        <Typography variant="body" className="minionName">
          {name}
        </Typography>
        <div
          className="minionText"
          dangerouslySetInnerHTML={{ __html: `<p>${text}</p>` }}
        />
      </Paper>
      <PlayCardModal
        isOpen={open}
        handleClose={handleClose}
        player={player}
        game={game}
        moves={moves}
        card={card}
      />
    </>
  );
}
