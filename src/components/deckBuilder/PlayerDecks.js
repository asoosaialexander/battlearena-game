import { Button, Card, CardContent, Typography } from "@mui/material";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import {
  addPlayerDeck,
  getAllPlayerDecks,
  deletePlayerDeck,
} from "../../services/playerDeck";
import HeroSelectionModal from "./HeroSelectionModal";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/system";

export default function PlayerDecks({
  toggleShowPlayerDecks,
  updateSelectedDeck,
  updateTabContent,
}) {
  const [isOpen, setOpen] = React.useState(false);
  const [deckList, setDeckList] = React.useState([]);

  useEffect(() => {
    getAllPlayerDecks().then((res) => setDeckList(res.data));
  }, [toggleShowPlayerDecks]);

  const addNewDeck = (hero) => {
    const newDeck = {
      id: Math.random().toString(),
      name: `CUSTOM ${hero}`,
      hero,
      cards: [],
    };
    addPlayerDeck(newDeck);
    updateSelectedDeck(newDeck);
    toggleShowPlayerDecks(false);
    updateTabContent(hero);
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
                      deletePlayerDeck(deck.id);
                      const index = deckList.indexOf(deck);
                      const updatedDeckList = [...deckList];
                      updatedDeckList.splice(index, 1);
                      setDeckList(updatedDeckList);
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
              setOpen(true);
            }}
          >
            New Deck
          </Button>
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
    </>
  );
}
