import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { APIRoot } from "../common/constants";

export default function CustomDeck({ cards, cardCount, toggleShowPlayerDecks }) {
  const [deckName, changeDeckName] = React.useState("CUSTOM DECK");
  const [isEditable, toggleEditable] = React.useState(false);
  return (
    <Card sx={{ p: 1, marginLeft: 1 }}>
      <CardContent>
        <Paper
          elevation={0}
          onMouseEnter={() => toggleEditable(true)}
          onMouseLeave={() => toggleEditable(false)}
        >
          {!isEditable ? (
            <Typography
              variant="h5"
              display="block"
              sx={{
                p: 1,
                marginBottom: 2,
                fontSize: 36,
                color: "goldenrod",
                fontVariant: "all-small-caps",
                borderWidth: 1,
                borderColor: "black",
                borderStyle: "dotted",
              }}
            >
              {deckName}{" "}
            </Typography>
          ) : (
            <TextField
              label="Deck Name"
              variant="outlined"
              value={deckName}
              onChange={(e) => changeDeckName(e.target.value.toUpperCase())}
              sx={{ marginBottom: 1 }}
              fullWidth
            />
          )}
        </Paper>
        {cards.length === 0 && (
          <Typography variant="h5" sx={{ m: 2 }}>
            No cards added
          </Typography>
        )}
        {[...new Set(cards)].map((card) => (
          <Paper elevation={0} sx={{ position: "relative" }} key={card.id}>
            <img
              className="selectedCard"
              src={`${APIRoot}/tiles/${card.id}.jpg`}
              alt={card.name}
            />
            <Typography variant="body" className="noOfCards">
              {cardCount.find((c) => c.id === card.id).count}
            </Typography>
          </Paper>
        ))}
        <Typography variant="h6" display="block">
          {cards.length}/30 Cards
        </Typography>
        <Button size="large" variant="outlined" color="primary">
          Save
        </Button>{" "}
        <Button size="large" variant="outlined" color="secondary" onClick={()=>toggleShowPlayerDecks(true)}>
          Back
        </Button>
      </CardContent>
    </Card>
  );
}
