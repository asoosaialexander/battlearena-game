import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import GameLobby from "./game/GameLobby";
import AuthContext from "../context/auth-context";

export default function Home() {
  let navigate = useNavigate();
  const ctx = useContext(AuthContext);
  return (
    <Container maxWidth="sm">
      <Typography
        variant="h1"
        sx={{
          fontVariant: "small-caps",
          color: "goldenrod",
          fontWeight: "bold",
          fontFamily: "Belwe Bd BT",
        }}
      >
        Battle Arena
      </Typography>
      <Stack spacing={2} sx={{ m: 10 }}>
        <Button
          variant="outlined"
          fullWidth
          sx={{
            fontSize: 36,
            fontFamily: "Belwe Bd BT",
          }}
          onClick={() => {
            navigate("/deckSelection");
          }}
        >
          Play
        </Button>
        <Button
          variant="outlined"
          fullWidth
          sx={{
            fontSize: 36,
            fontFamily: "Belwe Bd BT",
          }}
          onClick={() => {
            navigate("/collection");
          }}
        >
          Collection
        </Button>
        {ctx.isLoggedIn && (
          <Button
            variant="outlined"
            fullWidth
            sx={{
              fontSize: 36,
              fontFamily: "Belwe Bd BT",
            }}
            onClick={ctx.onLogout}
          >
            Logout
          </Button>
        )}
      </Stack>
      {/* <GameLobby /> */}
    </Container>
  );
}
