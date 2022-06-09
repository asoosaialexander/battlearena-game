import { Button, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom";
import { useGetAllPlayerDecksQuery } from "../../services/playerDeck";
import HeroSelectionModal from "./HeroSelectionModal";

export default function PlayerDecks({
  toggleShowPlayerDecks,
  updateSelectedDeck,
  updateTabContent,
}) {
  const [isOpen, setOpen] = React.useState(false);
  const { data, error, isLoading } = useGetAllPlayerDecksQuery();

  const addNewDeck = (hero) => {
    updateSelectedDeck({
      id: Math.random().toString(),
      name: `CUSTOM ${hero}`,
      hero,
      cards: [],
    });
    toggleShowPlayerDecks(false);
    updateTabContent(hero);
  };

  return (
    <>
      <Card sx={{ p: 1, marginLeft: 1, paddingLeft: 1 }}>
        <CardContent>
          {data &&
            data.map((deck) => {
              return (
                <Button
                  key={deck.id}
                  size="large"
                  variant="outlined"
                  color="primary"
                  fullWidth
                  sx={{ p: 2, m: 1 }}
                  onClick={() => {
                    updateSelectedDeck(deck);
                    toggleShowPlayerDecks(false);
                    updateTabContent(deck.hero);
                  }}
                >
                  <Typography variant="h6">{deck.name}</Typography>
                </Button>
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
