import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";

export default function Home() {
  let navigate = useNavigate();
  return (
    <Container maxWidth="sm">
      <Typography
        variant="h1"
        sx={{
          fontVariant: "small-caps",
          color: "goldenrod",
          fontWeight: "bold",
        }}
      >
        Battle Arena
      </Typography>
      <Stack spacing={2} sx={{ m: 10 }}>
        <Button
          fullWidth
          sx={{
            fontSize: 36,
          }}
          onClick={(e) => {
            e.preventDefault();
            navigate("/heroSelection");
          }}
        >
          Play
        </Button>
        <Button
          fullWidth
          sx={{
            fontSize: 36,
          }}
          onClick={(e) => {
            e.preventDefault();
            navigate("/collection");
          }}
        >
          Collection
        </Button>
      </Stack>
    </Container>
  );
}
