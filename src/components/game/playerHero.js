import { Grid, Typography } from "@mui/material";
import React from "react";
import { Deck } from "../common/constants";
import ArmorImg from "./../../images/armor.webp";
import HealthImg from "./../../images/health.png";
import HeroFrame from "./../../images/heroFrame.png";
import HeroPower from "./../../images/heroPower.webp";
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
import "./Hero.css";

export default function PlayerHero({ game, player, moves }) {
  const hero = game.players[player].hero;
  let heroImg, powerImg;
  switch (hero.class) {
    case Deck.Mage:
      heroImg = MageHero;
      powerImg = MagePower;
      // usePower = moves.attackHeroWithDamage(1)
      break;
    case Deck.Warrior:
      heroImg = WarriorHero;
      powerImg = WarriorPower;
      break;
    case Deck.Shaman:
      heroImg = ShamanHero;
      powerImg = ShamanPower;
      break;
    case Deck.DemonHunter:
      heroImg = DemonHunterHero;
      powerImg = DemonHunterPower;
      break;
    case Deck.Druid:
      heroImg = DruidHero;
      powerImg = DruidPower;
      break;
    case Deck.Hunter:
      heroImg = HunterHero;
      powerImg = HunterPower;
      break;
    case Deck.Paladin:
      heroImg = PaladinHero;
      powerImg = PaladinPower;
      break;
    case Deck.Priest:
      heroImg = PriestHero;
      powerImg = PriestPower;
      break;
    case Deck.Warlock:
      heroImg = WarlockHero;
      powerImg = WarlockPower;
      break;
    case Deck.Rogue:
      heroImg = RogueHero;
      powerImg = RoguePower;
      break;
    default:
      heroImg = HeroFrame;
      powerImg = HeroPower;
      break;
  }
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{ position: "relative" }}
      gap={1}
    >
      <Grid item sx={{ position: "relative" }}>
        <img
          className="heroFrame"
          src={heroImg}
          alt="Hero"
          onClick={() => {
            if (!hero.attack > 0) {
              console.log("hero can't attack");
            }
          }}
        />
        <img className="heroHealthImg" src={HealthImg} alt="HeroHealth" />
        <img className="armorImg" src={ArmorImg} alt="HeroArmor" />
        <Typography
          variant="body"
          className={hero.armor > 9 ? "heroArmor double" : "heroArmor single"}
        >
          {hero.armor}
        </Typography>
        <Typography
          variant="body"
          className={
            hero.health > 9 ? "heroHealth double" : "heroHealth single"
          }
        >
          {hero.health}
        </Typography>
      </Grid>
      <Grid item>
        <img className="heroFrame" src={powerImg} alt="Hero" />
      </Grid>
    </Grid>
  );
}
