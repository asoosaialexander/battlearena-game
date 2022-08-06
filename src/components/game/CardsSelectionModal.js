import { Box, Button, Grid, Modal } from "@mui/material";
import React from "react";
import PlayerCard from "../deckBuilder/PlayerCard";
import Styles from "./CardsSelectionModal.module.css";
import CardRemoveImg from "./../../images/remove_card.png";

export default function CardsSelectionModal({
  game,
  context,
  moves,
}) {
  const cards = game.players[context.currentPlayer].selection;
  console.log(cards);
  return (
    <>
      <Modal open={game.cardSelectionIsActive}>
        <Box className={Styles["modal-content"]}>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            sx={{ minHeight: "260px" }}
          >
            {cards &&
              cards.map((card) => (
                <Box
                  key={card.uniqueId}
                  sx={{ position: "relative", cursor: "pointer" }}
                  onClick={() => moves.markCard(card)}
                >
                  <PlayerCard card={card} handleClick={() => {}} />
                  {card.isMarked && (
                    <img
                      src={CardRemoveImg}
                      alt="CardRemoved"
                      className={Styles["card-image"]}
                    />
                  )}
                </Box>
              ))}
          </Grid>
          <Grid sx={{ textAlign: "center" }}>
            <Button
              variant="outlined"
              sx={{ fontSize: 18 }}
              onClick={() => {
                moves.drawInitialCards();
                moves.toggleCardSelection(false);
              }}
            >
              Confirm
            </Button>
          </Grid>
        </Box>
      </Modal>
    </>
  );
}
