import { Grid, Typography } from "@mui/material";
import GemImg from "./../../images/gem.png";
import LockImg from "./../../images/lock.png";

export default function Mana({ game, player }) {
  const mana = game.players[player].mana;

  return (
    <Grid container sx={{ marginTop: 2 }} justifyContent="center">
      <Grid item>
        {[...Array(mana.total)].map((x, i) => {
          const value = i < mana.available ? "100%" : "30%";
          return (
            <img
              key={i}
              src={GemImg}
              alt="gem"
              style={{ width: "40px", opacity: value }}
            />
          );
        })}
      </Grid>
      <Grid item sx={{ paddingLeft: 1 }}>
        <Typography
          variant="body"
          sx={{
            fontFamily: "Belwe Bd BT",
            fontSize: 36,
          }}
        >{`(${mana.available}/${mana.total})`}</Typography>
      </Grid>
      <Grid item>
        {[...Array(mana.overload)].map((x, i) => {
          return (
            <img key={i} src={LockImg} alt="lock" style={{ width: "20px" }} />
          );
        })}
      </Grid>
    </Grid>
  );
}
