import { TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import GemImage from "./../images/gem.png";
import CoreNeutral from "../data/core-neutral.json";
import CoreDemonHunter from "../data/core-demonhunter.json";
import CoreDruid from "../data/core-druid.json";
import CoreHunter from "../data/core-hunter.json";
import CoreMage from "../data/core-mage.json";
import CorePaladin from "../data/core-paladin.json";
import CorePriest from "../data/core-priest.json";
import CoreRogue from "../data/core-rogue.json";
import CoreShaman from "../data/core-shaman.json";
import CoreWarlock from "../data/core-warlock.json";
import CoreWarrior from "../data/core-warrior.json";
import { Deck } from "../common/constants";

export default function CardFilter({ selectedValue, actions }) {
  const filterCost = (cost) => {
    if (cost === "7+") {
      actions.setDemonHunterCards(
        CoreDemonHunter.filter((card) => card.cost >= 7)
      );
      actions.setDruidCards(CoreDruid.filter((card) => card.cost >= 7));
      actions.setHunterCards(CoreHunter.filter((card) => card.cost >= 7));
      actions.setMageCards(CoreMage.filter((card) => card.cost >= 7));
      actions.setPaladinCards(CorePaladin.filter((card) => card.cost >= 7));
      actions.setPriestCards(CorePriest.filter((card) => card.cost >= 7));
      actions.setRougeCards(CoreRogue.filter((card) => card.cost >= 7));
      actions.setShamanCards(CoreShaman.filter((card) => card.cost >= 7));
      actions.setWarlockCards(CoreWarlock.filter((card) => card.cost >= 7));
      actions.setWarriorCards(CoreWarrior.filter((card) => card.cost >= 7));
      actions.setNeutralCards(CoreNeutral.filter((card) => card.cost >= 7));
      switch (selectedValue) {
        case Deck.DemonHunter:
          actions.setCards(CoreDemonHunter.filter((card) => card.cost >= 7));
          break;
        case Deck.Druid:
          actions.setCards(CoreDruid.filter((card) => card.cost >= 7));
          break;
        case Deck.Hunter:
          actions.setCards(CoreHunter.filter((card) => card.cost >= 7));
          break;
        case Deck.Mage:
          actions.setCards(CoreMage.filter((card) => card.cost >= 7));
          break;
        case Deck.Paladin:
          actions.setCards(CorePaladin.filter((card) => card.cost >= 7));
          break;
        case Deck.Priest:
          actions.setCards(CorePriest.filter((card) => card.cost >= 7));
          break;
        case Deck.Rouge:
          actions.setCards(CoreRogue.filter((card) => card.cost >= 7));
          break;
        case Deck.Shaman:
          actions.setCards(CoreShaman.filter((card) => card.cost >= 7));
          break;
        case Deck.Warlock:
          actions.setCards(CoreWarlock.filter((card) => card.cost >= 7));
          break;
        case Deck.Warrior:
          actions.setCards(CoreWarrior.filter((card) => card.cost >= 7));
          break;
        default:
          actions.setCards(CoreNeutral.filter((card) => card.cost >= 7));
      }
    } else {
      actions.setCards(CoreDemonHunter.filter((card) => card.cost === cost));
      actions.setDemonHunterCards(
        CoreDemonHunter.filter((card) => card.cost === cost)
      );
      actions.setDruidCards(CoreDruid.filter((card) => card.cost === cost));
      actions.setHunterCards(CoreHunter.filter((card) => card.cost === cost));
      actions.setMageCards(CoreMage.filter((card) => card.cost === cost));
      actions.setPaladinCards(CorePaladin.filter((card) => card.cost === cost));
      actions.setPriestCards(CorePriest.filter((card) => card.cost === cost));
      actions.setRougeCards(CoreRogue.filter((card) => card.cost === cost));
      actions.setShamanCards(CoreShaman.filter((card) => card.cost === cost));
      actions.setWarlockCards(CoreWarlock.filter((card) => card.cost === cost));
      actions.setWarriorCards(CoreWarrior.filter((card) => card.cost === cost));
      actions.setNeutralCards(CoreNeutral.filter((card) => card.cost === cost));
      switch (selectedValue) {
        case Deck.DemonHunter:
          actions.setCards(
            CoreDemonHunter.filter((card) => card.cost === cost)
          );
          break;
        case Deck.Druid:
          actions.setCards(CoreDruid.filter((card) => card.cost === cost));
          break;
        case Deck.Hunter:
          actions.setCards(CoreHunter.filter((card) => card.cost === cost));
          break;
        case Deck.Mage:
          actions.setCards(CoreMage.filter((card) => card.cost === cost));
          break;
        case Deck.Paladin:
          actions.setCards(CorePaladin.filter((card) => card.cost === cost));
          break;
        case Deck.Priest:
          actions.setCards(CorePriest.filter((card) => card.cost === cost));
          break;
        case Deck.Rouge:
          actions.setCards(CoreRogue.filter((card) => card.cost === cost));
          break;
        case Deck.Shaman:
          actions.setCards(CoreShaman.filter((card) => card.cost === cost));
          break;
        case Deck.Warlock:
          actions.setCards(CoreWarlock.filter((card) => card.cost === cost));
          break;
        case Deck.Warrior:
          actions.setCards(CoreWarrior.filter((card) => card.cost === cost));
          break;
        default:
          actions.setCards(CoreNeutral.filter((card) => card.cost === cost));
      }
    }
  };
  return (
    <Box sx={{ textAlign: "center" }}>
      {[1, 2, 3, 4, 5, 6].map((cost, index) => (
        <Box
          key={index}
          sx={{
            position: "relative",
            display: "inline",
            cursor: "pointer",
          }}
          onClick={() => filterCost(cost)}
        >
          <img className="costImg" src={GemImage} alt={`cost${cost}`} />
          <Typography variant="body" className="costValue">
            {cost}
          </Typography>
        </Box>
      ))}
      <Box
        sx={{
          position: "relative",
          display: "inline",
          cursor: "pointer",
        }}
        onClick={() => filterCost("7+")}
      >
        <img className="costImg" src={GemImage} alt={`cost7+`} />
        <Typography variant="body" className="costValue seven">
          {"7+"}
        </Typography>
      </Box>
      <TextField label="Search" variant="outlined" className="searchInput" />
    </Box>
  );
}
