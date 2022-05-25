import { Button, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { useGetAllPlayerDecksQuery } from "../../services/playerDeck";

export default function PlayerDecks({
  toggleShowPlayerDecks,
  updateSelectedCards,
}) {
  
  const { data, error, isLoading } = useGetAllPlayerDecksQuery();

  return (
    <Card sx={{ p: 1, marginLeft: 1, paddingLeft: 1 }}>
      <CardContent>
        {data && data.map((deck) => {
          return (
            <Button
              key={deck.id}
              size="large"
              variant="outlined"
              color="primary"
              fullWidth
              sx={{ p: 2, m: 1 }}
              onClick={() => {
                updateSelectedCards(deck.cards);
                toggleShowPlayerDecks(false);
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
        >
          New Deck
        </Button>
      </CardContent>
    </Card>
  );
}
