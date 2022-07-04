import { TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useReducer } from "react";
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

const filterReducer = (state, action) => {
  if (action.type === "TEXT_FILTER_INPUT") {
    return { ...state, text: action.value };
  }
  if (action.type === "COST_FILTER_INPUT") {
    return { ...state, cost: action.value };
  }
  return { text: "", cost: null };
};

export default function CardFilter({ selectedValue, actions }) {
  const [filterState, dispatchFilter] = useReducer(filterReducer, {
    text: "",
    cost: null,
  });
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

  const handleCostButtonClick = (cost) => {
    if (filterState.cost === cost) {
      dispatchFilter({ type: "COST_FILTER_INPUT", value: "" });
      filterCardsByCost("");
    } else {
      dispatchFilter({ type: "COST_FILTER_INPUT", value: cost });
      filterCardsByCost(cost);
    }
  };

  return (
    <Box sx={{ textAlign: "center" }}>
      {[0, 1, 2, 3, 4, 5, 6, "7+"].map((cost, index) => (
        <Box
          key={index}
          sx={{
            position: "relative",
            display: "inline",
            cursor: "pointer",
          }}
          onClick={() => {
            handleCostButtonClick(cost);
          }}
        >
          <img
            className={`costImg ${filterState.cost === cost ? "selected" : ""}`}
            src={GemImage}
            alt={`cost${cost}`}
          />
          <Typography
            variant="body"
            className={`costText ${
              filterState.cost === cost ? "selected" : ""
            }`}
          >
            {cost}
          </Typography>
        </Box>
      ))}
      <TextField
        label="Search"
        variant="outlined"
        className="searchInput"
        value={filterState.text}
        onChange={(e) => {
          dispatchFilter({ type: "TEXT_FILTER_INPUT", value: e.target.value });
          filterCardsByText(e.target.value);
        }}
      />
    </Box>
  );
}
