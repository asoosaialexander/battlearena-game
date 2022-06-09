import { Button, Card, Grid, Modal, Typography } from "@mui/material";
import { CardClass, Deck } from "../common/constants";
import DemonHunter from "./../../images/Demon_Hunter_icon.webp";
import Hunter from "./../../images/Hunter_icon.webp";
import Druid from "./../../images/Druid_icon.webp";
import Mage from "./../../images/Mage_icon.webp";
import Warlock from "./../../images/Warlock_icon.webp";
import Warrior from "./../../images/Warrior_icon.webp";
import Rogue from "./../../images/Rogue_icon.webp";
import Paladin from "./../../images/Paladin_icon.webp";
import Priest from "./../../images/Priest_icon.webp";
import Shaman from "./../../images/Shaman_icon.webp";
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
import React, { useState } from "react";
import Styles from "./HeroSelectionModal.module.css";

function Hero({ name, hero, setHero }) {
  const getImageSrc = (deckName) => {
    switch (deckName) {
      case Deck.DemonHunter:
        return DemonHunter;
      case Deck.Druid:
        return Druid;
      case Deck.Hunter:
        return Hunter;
      case Deck.Mage:
        return Mage;
      case Deck.Paladin:
        return Paladin;
      case Deck.Priest:
        return Priest;
      case Deck.Warrior:
        return Warrior;
      case Deck.Warlock:
        return Warlock;
      case Deck.Rogue:
        return Rogue;
      case Deck.Shaman:
        return Shaman;
      default:
        return null;
    }
  };

  return (
    <Card
      sx={{
        p: 4,
        m: 2,
        alignSelf: "center",
        textAlign: "center",
        cursor: "pointer",
        border: 4,
        borderRadius: 2,
        borderColor: hero === name ? "goldenrod" : "white",
      }}
      onClick={() => {
        setHero(name);
      }}
    >
      <img src={getImageSrc(name)} alt={name} />
      <Typography
        variant="body1"
        sx={{
          fontWeight: "bold",
        }}
      >
        {name}
      </Typography>
    </Card>
  );
}

export default function HeroSelectionModal({
  isOpen,
  handleOkClick,
  handleCancelClick,
}) {
  const [selectedHero, setSelectedHero] = useState("");
  const getHeroImages = () => {
    switch (selectedHero) {
      case Deck.DemonHunter:
        return (
          <>
            <img src={DemonHunterHero} alt={selectedHero} />
            <img src={DemonHunterPower} alt={`${selectedHero} power`} />
          </>
        );
      case Deck.Druid:
        return (
          <>
            <img src={DruidHero} alt={selectedHero} />
            <img src={DruidPower} alt={`${selectedHero} power`} />
          </>
        );
      case Deck.Hunter:
        return (
          <>
            <img src={HunterHero} alt={selectedHero} />
            <img src={HunterPower} alt={`${selectedHero} power`} />
          </>
        );
      case Deck.Mage:
        return (
          <>
            <img src={MageHero} alt={selectedHero} />
            <img src={MagePower} alt={`${selectedHero} power`} />
          </>
        );
      case Deck.Paladin:
        return (
          <>
            <img src={PaladinHero} alt={selectedHero} />
            <img src={PaladinPower} alt={`${selectedHero} power`} />
          </>
        );
      case Deck.Priest:
        return (
          <>
            <img src={PriestHero} alt={selectedHero} />
            <img src={PriestPower} alt={`${selectedHero} power`} />
          </>
        );
      case Deck.Warrior:
        return (
          <>
            <img src={WarriorHero} alt={selectedHero} />
            <img src={WarriorPower} alt={`${selectedHero} power`} />
          </>
        );
      case Deck.Warlock:
        return (
          <>
            <img src={WarlockHero} alt={selectedHero} />
            <img src={WarlockPower} alt={`${selectedHero} power`} />
          </>
        );
      case Deck.Rogue:
        return (
          <>
            <img src={RogueHero} alt={selectedHero} />
            <img src={RoguePower} alt={`${selectedHero} power`} />
          </>
        );
      case Deck.Shaman:
        return (
          <>
            <img src={ShamanHero} alt={selectedHero} />
            <img src={ShamanPower} alt={`${selectedHero} power`} />
          </>
        );
      default:
        return null;
    }
  };
  return (
    <Modal open={isOpen} onClose={handleCancelClick} sx={{ width: 1400 }}>
      <Card className={Styles["modal-content"]}>
        <Grid container sx={{ flexGrow: 1, alignItems: "flex-start" }}>
          <Grid item xs={8}>
            <Typography
              variant="h5"
              sx={{
                m: 2,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Choose Your Hero
            </Typography>
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              sx={{ minHeight: "260px" }}
            >
              {CardClass.filter((card) => card !== Deck.Neutral).map(
                (hero, index) => (
                  <Hero
                    key={index}
                    name={hero}
                    hero={selectedHero}
                    setHero={setSelectedHero}
                  />
                )
              )}
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid
              container
              sx={{ alignContent: "center", textAlign: "center" }}
            >
              <Grid item xs={12}>
                <Card
                  variant="outlined"
                  sx={{
                    m: 2,
                    minHeight: 700,
                  }}
                >
                  {selectedHero ? (
                    getHeroImages()
                  ) : (
                    <Typography variant="h6" sx={{ paddingTop: 5 }}>
                      Click on hero to select
                    </Typography>
                  )}
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  sx={{
                    fontSize: 24,
                    fontWeight: "bold",
                    fontFamily: "Belwe Bd BT",
                  }}
                  onClick={() => handleOkClick(selectedHero)}
                >
                  Choose
                </Button>{" "}
                <Button
                  variant="outlined"
                  color="secondary"
                  sx={{
                    fontSize: 18,
                    fontWeight: "bold",
                    fontFamily: "Belwe Bd BT",
                  }}
                  onClick={handleCancelClick}
                >
                  Back
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </Modal>
  );
}
