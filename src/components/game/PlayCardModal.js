import React from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
} from "@mui/material";

export default function PlayCardModal({
  isOpen,
  handleClose,
  game,
  player,
  moves,
  card,
}) {
  const [position, setPosition] = React.useState("");
  const minions = game.players[player].minions;

  const handleChange = (event) => {
    setPosition(event.target.value);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "white",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Modal open={isOpen} onClose={handleClose}>
        <Box sx={style}>
          <FormControl fullWidth>
            <InputLabel>Target</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={position}
              label="target"
              onChange={handleChange}
            >
              {[...Array(minions.length + 1)].map((m, i) => {
                return (
                  <MenuItem key={i} value={i}>
                    {`Position ${i}`}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <Grid gap={1} container direction={"row"} sx={{ marginTop: 1 }}>
            <Grid item>
              <Button
                variant="outlined"
                onClick={() => {
                  handleClose();
                  moves.playCard(card, position);
                }}
              >
                Play
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" onClick={handleClose}>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
}
