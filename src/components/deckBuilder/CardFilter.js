import { TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import GemImage from "./../../images/gem.png";
import CoreNeutral from "../../data/core-neutral.json";
import CoreDemonHunter from "../../data/core-demonhunter.json";
import CoreDruid from "../../data/core-druid.json";
import CoreHunter from "../../data/core-hunter.json";
import CoreMage from "../../data/core-mage.json";
import CorePaladin from "../../data/core-paladin.json";
import CorePriest from "../../data/core-priest.json";
import CoreRogue from "../../data/core-rogue.json";
import CoreShaman from "../../data/core-shaman.json";
import CoreWarlock from "../../data/core-warlock.json";
import CoreWarrior from "../../data/core-warrior.json";
import { Deck } from "../common/constants";

export default function CardFilter({ selectedValue, actions }) {
  const [filterText, setFilterText] = React.useState("");
  const [filterCost, setFilterCost] = React.useState();
  const filterCards = (filterAction) => {
    actions.setDemonHunterCards(
      CoreDemonHunter.filter((card) => filterAction(card))
    );
    actions.setDruidCards(CoreDruid.filter((card) => filterAction(card)));
    actions.setHunterCards(CoreHunter.filter((card) => filterAction(card)));
    actions.setMageCards(CoreMage.filter((card) => filterAction(card)));
    actions.setPaladinCards(CorePaladin.filter((card) => filterAction(card)));
    actions.setPriestCards(CorePriest.filter((card) => filterAction(card)));
    actions.setRogueCards(CoreRogue.filter((card) => filterAction(card)));
    actions.setShamanCards(CoreShaman.filter((card) => filterAction(card)));
    actions.setWarlockCards(CoreWarlock.filter((card) => filterAction(card)));
    actions.setWarriorCards(CoreWarrior.filter((card) => filterAction(card)));
    actions.setNeutralCards(CoreNeutral.filter((card) => filterAction(card)));
    switch (selectedValue) {
      case Deck.DemonHunter:
        actions.setCards(CoreDemonHunter.filter((card) => filterAction(card)));
        break;
      case Deck.Druid:
        actions.setCards(CoreDruid.filter((card) => filterAction(card)));
        break;
      case Deck.Hunter:
        actions.setCards(CoreHunter.filter((card) => filterAction(card)));
        break;
      case Deck.Mage:
        actions.setCards(CoreMage.filter((card) => filterAction(card)));
        break;
      case Deck.Paladin:
        actions.setCards(CorePaladin.filter((card) => filterAction(card)));
        break;
      case Deck.Priest:
        actions.setCards(CorePriest.filter((card) => filterAction(card)));
        break;
      case Deck.Rogue:
        actions.setCards(CoreRogue.filter((card) => filterAction(card)));
        break;
      case Deck.Shaman:
        actions.setCards(CoreShaman.filter((card) => filterAction(card)));
        break;
      case Deck.Warlock:
        actions.setCards(CoreWarlock.filter((card) => filterAction(card)));
        break;
      case Deck.Warrior:
        actions.setCards(CoreWarrior.filter((card) => filterAction(card)));
        break;
      default:
        actions.setCards(CoreNeutral.filter((card) => filterAction(card)));
    }
  };
  const filterCardsByCost = (cost) => {
    const fn = (card) => {
      switch (cost) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
          return card.cost === cost;
        case "7+":
          return card.cost >= 7;
        default:
          return true;
      }
    };
    filterCards(fn);
  };
  const filterCardsByText = (text) => {
    const fn = (card) =>
      card.name.toLowerCase().includes(text.toLowerCase()) ||
      (card.rarity && card.rarity.toLowerCase().includes(text.toLowerCase())) ||
      (card.text && card.text.toLowerCase().includes(text.toLowerCase()));
    filterCards(fn);
  };
  return (
    <Box sx={{ textAlign: "center" }}>
      {[0, 1, 2, 3, 4, 5, 6].map((cost, index) => (
        <Box
          key={index}
          sx={{
            position: "relative",
            display: "inline",
            cursor: "pointer",
          }}
          onClick={() => {
            if (filterCost === cost) {
              setFilterCost("");
              filterCardsByCost("");
            } else {
              setFilterCost(cost);
              filterCardsByCost(cost);
            }
          }}
        >
          <img
            className="costImg"
            src={GemImage}
            alt={`cost${cost}`}
            style={{
              border: filterCost === cost ? "4px goldenrod solid" : "",
            }}
          />
          <Typography
            variant="body"
            className={`costValue ${filterCost === cost ? "selected" : ""}`}
          >
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
        onClick={() => {
          setFilterCost("7+");
          filterCardsByCost("7+");
        }}
      >
        <img
          className="costImg"
          src={GemImage}
          alt={`cost7+`}
          style={{
            border: filterCost === "7+" ? "4px goldenrod solid" : "",
          }}
        />
        <Typography variant="body" className="costValue seven">
          {"7+"}
        </Typography>
      </Box>
      <TextField
        label="Search"
        variant="outlined"
        className="searchInput"
        value={filterText}
        onChange={(e) => {
          setFilterText(e.target.value);
          filterCardsByText(e.target.value);
        }}
      />
    </Box>
  );
}
