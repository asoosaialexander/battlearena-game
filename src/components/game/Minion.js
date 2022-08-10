import {
  Button,
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import React from "react";
import "./Minion.css";
import HealthImg from "./../../images/health.png";
import AttackImg from "./../../images/attack.png";
import PoisonousImg from "./../../images/icon_poisonous.png";
import DeathratlleImg from "./../../images/icon_deathrattle.png";
import SleepImg from "./../../images/minionSleeping.png";
import { Box } from "@mui/system";
import { Mechanics, Rarity } from "./../common/constants";

export default function Minion({ card, context, game, moves }) {
  const { uniqueId, attack, health, rarity, name, mechanics, text, isReady } =
    card;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [target, setTarget] = React.useState("");
  const [helpText, setHelpText] = React.useState(false);

  const opponentMinions =
    game.players[context.currentPlayer === "0" ? "1" : "0"].minions;

  const tauntMinions = [];
  for (const minion of opponentMinions) {
    if (minion.mechanics && minion.mechanics.includes(Mechanics.Taunt))
      tauntMinions.push(minion);
  }

  let availableTargets;
  if (tauntMinions.length > 0) {
    availableTargets = tauntMinions;
  } else {
    availableTargets = opponentMinions;
  }

  const handleChange = (event) => {
    setTarget(event.target.value);
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
    <Box sx={{ position: "relative" }}>
      <Paper
        elevation={0}
        className="mContainer"
        onClick={() => {
          if (!card.isReady) return console.log("Minion Not Ready!");
          handleOpen();
        }}
        onMouseEnter={() => {
          setHelpText(true);
        }}
        onMouseLeave={() => {
          setHelpText(false);
        }}
      >
        <Box
          className={rarity === Rarity.Legendary ? "frame" : "normalFrame"}
        />
        <img className="attackImg" src={AttackImg} alt="Icons" />
        <Typography className="mName" variant="body">
          {name}
        </Typography>
        <Typography
          variant="body"
          className={attack > 9 ? "mAttack double" : "mAttack single"}
        >
          {attack}
        </Typography>
        <img
          className={`healthImg${rarity === Rarity.Legendary ? 1 : 2}`}
          src={HealthImg}
          alt="Icons"
        />
        <Typography
          variant="body"
          className={
            health > 9
              ? `mHealth double${rarity === Rarity.Legendary ? 1 : 2}`
              : `mHealth single${rarity === Rarity.Legendary ? 1 : 2}`
          }
        >
          {health}
        </Typography>
        {mechanics && mechanics.includes(Mechanics.Poisonous) && (
          <img className="poisonous" src={PoisonousImg} alt="posion" />
        )}
        {mechanics && mechanics.includes(Mechanics.Deathrattle) && (
          <img className="deathrattle" src={DeathratlleImg} alt="posion" />
        )}
        {!isReady && <img className="sleep" src={SleepImg} alt="sleep" />}
      </Paper>
      {text && helpText && (
        <Card
          sx={{
            position: "absolute",
            overflow: "clip",
            width: 200,
            paddingLeft: 2,
            paddingRight: 2,
            left: 160,
            top: 0,
            zIndex: 1,
            border: "2px solid black",
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: `<p>${text}</p>` }} />
        </Card>
      )}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <FormControl fullWidth>
            <InputLabel>Target</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={target}
              label="target"
              onChange={handleChange}
            >
              {availableTargets.map((m) => {
                return (
                  <MenuItem key={m.uniqueId} value={m.uniqueId}>
                    {m.name}
                  </MenuItem>
                );
              })}
              {tauntMinions.length === 0 && (
                <MenuItem value={"hero"}>{"HERO"}</MenuItem>
              )}
            </Select>
          </FormControl>
          <Grid gap={1} container direction={"row"} sx={{ marginTop: 1 }}>
            <Grid item>
              <Button
                variant="outlined"
                onClick={() => {
                  if (target === "hero") moves.attackHeroWithMinion(uniqueId);
                  else moves.attackMinionWithMinion(uniqueId, target);
                  handleClose();
                }}
              >
                Attack
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" onClick={handleClose}>
                Nevermind
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Box>
  );
}
