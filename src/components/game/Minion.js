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
import { Box } from "@mui/system";
import { Mechanics, Rarity } from "./../common/constants";
import {
  selectSelfMinions,
  selectEnemyMinions,
  attackMinionWithMinion,
  clearDeadMinions
} from "./playAreaSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Minion(props) {
  const { id, attack, health, rarity, name, mechanics, text } = props.card;
  const player = props.player;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [target, setTarget] = React.useState("");
  const [helpText, setHelpText] = React.useState(false);

  const selfMinions = useSelector(selectSelfMinions);
  const enemyMinions = useSelector(selectEnemyMinions);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setTarget(event.target.value);
  };

  const opponentMinions = player === "self" ? enemyMinions : selfMinions;

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
        onClick={handleOpen}
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
        {/* <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <clipPath id="clipCircle">
          <circle r="80" cx="50" cy="50" />
        </clipPath>
        <image
          width="400"
          height="400"
          clip-path="url(#clipCircle)"
          href={`https://art.hearthstonejson.com/v1/256x/${id}.jpg`}
        />
      </svg> */}
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Target</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={target}
              label="target"
              onChange={handleChange}
            >
              {opponentMinions.map((m) => {
                return (
                  <MenuItem key={m.id} value={m.id}>
                    {m.name}
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
                  dispatch(
                    attackMinionWithMinion({
                      selfMinionId: player === "self" ? id : target,
                      enemyMinionId: player === "enemy" ? id : target,
                    })
                  );
                  dispatch(clearDeadMinions());
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
