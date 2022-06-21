import { Box, Button, Card, Grid, Typography } from "@mui/material";
import { Deck } from "../common/constants";
import WarriorHero from "./../../images/Hero/HERO_01.webp";
import WarriorPower from "./../../images/Hero/HERO_01bp.webp";
import ShamanHero from "./../../images/Hero/HERO_02.webp";
import ShamanPower from "./../../images/Hero/HERO_02bp.webp";
import RogueHero from "./../../images/Hero/HERO_03.webp";
import RoguePower from "./../../images/Hero/HERO_03bp.webp";
import PaladinHero from "./../../images/Hero/HERO_04.webp";
import PaladinPower from "./../../images/Hero/HERO_04bp.webp";
import HunterHero from "./../../images/Hero/HERO_05.webp";
import HunterPower from "./../../images/Hero/HERO_05bp.webp";
import DruidHero from "./../../images/Hero/HERO_06.webp";
import DruidPower from "./../../images/Hero/HERO_06bp.webp";
import WarlockHero from "./../../images/Hero/HERO_07.webp";
import WarlockPower from "./../../images/Hero/HERO_07bp.webp";
import MageHero from "./../../images/Hero/HERO_08.webp";
import MagePower from "./../../images/Hero/HERO_08bp.webp";
import PriestHero from "./../../images/Hero/HERO_09.webp";
import PriestPower from "./../../images/Hero/HERO_09bp.webp";
import DemonHunterHero from "./../../images/Hero/HERO_10.webp";
import DemonHunterPower from "./../../images/Hero/HERO_10bp.webp";
import React, { useState, useEffect } from "react";
import { getAllPlayerDecks } from "../../services/playerDeck";
import { useNavigate } from "react-router-dom";

export default function DeckSelection() {
  const [deckList, setDeckList] = React.useState([]);
  const [selectedDeck, setSelectedDeck] = useState({});
  let navigate = useNavigate();

  useEffect(() => {
    getAllPlayerDecks().then((res) => setDeckList(res.data));
  }, []);

  const getHeroImages = () => {
    const heroProfile = (profilePic, powerPic) => {
      return (
        <>
          <Box>
            <img src={profilePic} alt={selectedDeck.hero} />
            <img src={powerPic} alt={`${selectedDeck.hero} power`} />
          </Box>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            {selectedDeck.name}
          </Typography>
          <Typography variant="h6">Win: 0</Typography>
          <Typography variant="h6">Loss: 0</Typography>
        </>
      );
    };

    switch (selectedDeck.hero) {
      case Deck.DemonHunter:
        return heroProfile(DemonHunterHero, DemonHunterPower);
      case Deck.Druid:
        return heroProfile(DruidHero, DruidPower);
      case Deck.Hunter:
        return heroProfile(HunterHero, HunterPower);
      case Deck.Mage:
        return heroProfile(MageHero, MagePower);
      case Deck.Paladin:
        return heroProfile(PaladinHero, PaladinPower);
      case Deck.Priest:
        return heroProfile(PriestHero, PriestPower);
      case Deck.Warrior:
        return heroProfile(WarriorHero, WarriorPower);
      case Deck.Warlock:
        return heroProfile(WarlockHero, WarlockPower);
      case Deck.Rogue:
        return heroProfile(RogueHero, RoguePower);
      case Deck.Shaman:
        return heroProfile(ShamanHero, ShamanPower);
      default:
        return null;
    }
  };
  return (
    <Box sx={{ m: 1, p: 1 }}>
      <Grid container sx={{ flexGrow: 1, alignItems: "flex-start" }}>
        <Grid item xs={5} sx={{ m: 1 }}>
          <Card variant="outlined" sx={{ p: 1 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Choose Your Deck
            </Typography>
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              sx={{ m: 2 }}
            >
              {deckList &&
                deckList.map((deck) => {
                  return (
                    <Box key={deck.id} sx={{ position: "relative", m: 2 }}>
                      <Button
                        size="large"
                        variant="outlined"
                        color="primary"
                        fullWidth
                        sx={{ p: 2 }}
                        onClick={() => {
                          setSelectedDeck(deck);
                        }}
                      >
                        <Typography variant="h6">{deck.name}</Typography>
                      </Button>
                    </Box>
                  );
                })}
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={5}>
          <Grid container sx={{ alignContent: "center", textAlign: "center" }}>
            <Grid item xs={12}>
              <Card
                variant="outlined"
                sx={{
                  m: 1,
                  p: 2,
                  minHeight: "260px",
                }}
              >
                {selectedDeck.hero ? (
                  getHeroImages()
                ) : (
                  <Typography variant="h6" sx={{ paddingTop: 5 }}>
                    Select a deck to play
                  </Typography>
                )}
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                disabled={selectedDeck.hero ? false : true}
                sx={{
                  fontSize: 24,
                  fontWeight: "bold",
                  fontFamily: "Belwe Bd BT",
                }}
                onClick={() => navigate("/play")}
              >
                Play
              </Button>{" "}
              <Button
                variant="outlined"
                color="secondary"
                sx={{
                  fontSize: 18,
                  fontWeight: "bold",
                  fontFamily: "Belwe Bd BT",
                }}
                onClick={() => navigate("/")}
              >
                Back
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
