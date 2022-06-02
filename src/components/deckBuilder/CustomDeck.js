import React from "react";
import {
  Button,
  Card,
  CardContent,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { APIRoot } from "../common/constants";
import "./CustomDeck.css";
import { useAddPlayerDeckMutation } from "../../services/playerDeck";

export default function CustomDeck({ deck, toggleShowPlayerDecks }) {
  const [deckName, changeDeckName] = React.useState(deck.name);
  const [
    updateDeck, // This is the mutation trigger
    { isLoading: isUpdating }, // This is the destructured mutation result
  ] = useAddPlayerDeckMutation();
  const { id, cards } = deck;

  const cardsWithCount = cards.map((card) => {
    if (cards.filter((c) => c.id === card.id).length === 1)
      return { ...card, count: 1, delete: false };
    else return { ...card, count: 2 };
  });

  let uniqueCards = [];
  for (const card of cardsWithCount) {
    if (!uniqueCards.find((c) => c.id === card.id)) uniqueCards.push(card);
  }

  return (
    <Card sx={{ p: 1, marginLeft: 1 }}>
      <CardContent>
        <Paper elevation={0}>
          <TextField
            label="Deck Name"
            variant="outlined"
            value={deckName}
            onChange={(e) => changeDeckName(e.target.value.toUpperCase())}
            sx={{ marginBottom: 1 }}
            fullWidth
          />
        </Paper>
        {uniqueCards.length === 0 && (
          <Typography variant="h5" sx={{ m: 2 }}>
            No cards added
          </Typography>
        )}
        {uniqueCards.map((card) => (
          <Paper elevation={0} sx={{ position: "relative" }} key={card.id}>
            <img
              className="selectedCard"
              src={`${APIRoot}/tiles/${card.id}.jpg`}
              alt={card.name}
            />
            <Typography variant="body" className="noOfCards">
              {card.count}
            </Typography>
          </Paper>
        ))}
        <Typography variant="h6" display="block">
          {cards.length}/30 Cards
        </Typography>
        <Button
          size="large"
          variant="outlined"
          color="primary"
          onClick={() => {
            updateDeck({ id, ...deck, name: deckName });
            toggleShowPlayerDecks(true);
          }}
        >
          Save
        </Button>{" "}
        <Button
          size="large"
          variant="outlined"
          color="secondary"
          onClick={() => toggleShowPlayerDecks(true)}
        >
          Back
        </Button>
      </CardContent>
    </Card>
  );
}
