import { Box, Button, Grid, Modal } from "@mui/material";
import React from "react";
import PlayerCard from "../deckBuilder/PlayerCard";
import Styles from "./CardsSelectionModal.module.css";
import CardRemoveImg from "./../../images/remove_card.png";
import { useDispatch, useSelector } from "react-redux";
import { drawInitialCards, markCard, selfSelectedCards } from "./playerSlice";

export default function CardsSelectionModal({ isOpen, handleClose }) {
  const cards = useSelector(selfSelectedCards);
  const dispatch = useDispatch();
  return (
    <>
      <Modal open={isOpen}>
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
                  onClick={() => dispatch(markCard({ player: "self", card }))}
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
              onClick={(e) => {
                e.preventDefault();
                dispatch(drawInitialCards("self"));
                handleClose(false);
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
