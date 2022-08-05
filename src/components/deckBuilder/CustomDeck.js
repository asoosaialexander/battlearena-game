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
import { updatePlayerDeck } from "../../services/playerDeck";

export default function CustomDeck({ deck, updateDeck, handleBackClick }) {
  const [deckName, changeDeckName] = React.useState(deck.name);
  const { cards } = deck;

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
          <Paper
            elevation={0}
            sx={{ position: "relative", cursor: "pointer" }}
            key={card.id}
            onClick={() => {
              updateDeck((prevValue) => {
                const index = cards.indexOf(
                  cards.find((c) => c.id === card.id)
                );
                //Copy before update since 'cards' is state obj and shouldn't be updated directly
                const cardsCopy = [...cards];
                //Remove selected card
                cardsCopy.splice(index, 1);
                return { ...prevValue, cards: cardsCopy };
              });
            }}
          >
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
        <Typography
          variant="h6"
          display="block"
          sx={{ marginBottom: 2, marginTop: 1, fontWeight: "bold" }}
        >
          {cards.length}/30 Cards
        </Typography>
        <Button
          size="large"
          variant="outlined"
          color="primary"
          disabled={deck.cards.length > 0 ? false : true}
          onClick={() => {
            updatePlayerDeck({ ...deck, name: deckName });
            handleBackClick();
          }}
        >
          Save
        </Button>{" "}
        <Button
          size="large"
          variant="outlined"
          color="secondary"
          onClick={handleBackClick}
        >
          Back
        </Button>
      </CardContent>
    </Card>
  );
}
