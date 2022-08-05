import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import {
  getAllPlayerDecks,
  deletePlayerDeck,
} from "../../services/playerDeck";
import HeroSelectionModal from "./HeroSelectionModal";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../common/ConfirmModal";

export default function PlayerDecks({
  toggleShowPlayerDecks,
  updateSelectedDeck,
  updateTabContent,
}) {
  const [isOpen, setOpen] = React.useState(false);
  const [isConfirmOpen, setConfirmOpen] = React.useState(false);
  const [selectedDeck, setSelectedDeck] = React.useState({});
  const [deckList, setDeckList] = React.useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    getAllPlayerDecks().then((res) => {
      const decks = [];
      for (let index in res.data) {
        decks.push({ id: index, ...res.data[index] });
      }
      setDeckList(decks);
    });
  }, [toggleShowPlayerDecks]);

  const addNewDeck = (hero) => {
    const newDeck = {
      name: `CUSTOM ${hero}`,
      hero,
      cards: [],
    };
    updateSelectedDeck(newDeck);
    toggleShowPlayerDecks(false);
    updateTabContent(hero);
  };

  const handleClose = (value) => {
    setConfirmOpen(false);

    if (value) {
      deletePlayerDeck(selectedDeck.id);
      const index = deckList.indexOf(selectedDeck);
      const updatedDeckList = [...deckList];
      updatedDeckList.splice(index, 1);
      setDeckList(updatedDeckList);
    }
  };

  return (
    <>
      <Card sx={{ p: 1, marginLeft: 1, paddingLeft: 1 }}>
        <CardContent>
          {deckList &&
            deckList.map((deck) => {
              return (
                <Box key={deck.id} sx={{ position: "relative" }}>
                  <Button
                    size="large"
                    variant="outlined"
                    color="primary"
                    fullWidth
                    sx={{ p: 2, marginBottom: 2 }}
                    onClick={() => {
                      updateSelectedDeck(deck);
                      toggleShowPlayerDecks(false);
                      updateTabContent(deck.hero);
                    }}
                  >
                    <Typography variant="h6">{deck.name}</Typography>
                  </Button>
                  <DeleteIcon
                    fontSize="large"
                    color="warning"
                    sx={{
                      position: "absolute",
                      top: -15,
                      right: -15,
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setConfirmOpen(true);
                      setSelectedDeck(deck);
                    }}
                  />
                </Box>
              );
            })}
          <Button
            size="large"
            variant="outlined"
            color="secondary"
            fullWidth
            sx={{ p: 2, m: 1 }}
            onClick={() => {
              if (deckList.length < 10) setOpen(true);
            }}
          >
            New Deck
          </Button>
          <Grid container justifyContent={"space-between"} sx={{ p: 2 }}>
            <Grid item>
              <Typography
                variant="h6"
                display="block"
                sx={{ fontWeight: "bold" }}
              >
                {deckList.length}/10 Decks
              </Typography>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/");
                }}
              >
                Back
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {isOpen &&
        ReactDOM.createPortal(
          <HeroSelectionModal
            isOpen={isOpen}
            handleOkClick={addNewDeck}
            handleCancelClick={() => setOpen(false)}
          />,
          document.getElementById("layover-root")
        )}
      {isConfirmOpen && (
        <ConfirmModal
          isOpen={isConfirmOpen}
          confirmText={"This will delete your deck. Are you sure?"}
          handleConfirmClick={() => handleClose(true)}
          handleCancelClick={() => handleClose(false)}
        />
      )}
    </>
  );
}
