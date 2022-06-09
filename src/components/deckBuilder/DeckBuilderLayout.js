import { Card, Grid, Pagination, Tab, Tabs, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { CardClass, Deck, Rarity } from "../common/constants";
import "./DeckBuilderLayout.css";
import CardFilter from "./CardFilter";
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
import CustomDeck from "./CustomDeck";
import PlayerDecks from "./PlayerDecks";
import TabPanel from "../common/TabPanel";
import PlayerCard from "./PlayerCard";

export default function DeckBuilderLayout() {
  const [value, setValue] = React.useState(Deck.DemonHunter);
  const [cards, setCards] = React.useState(CoreDemonHunter);
  const [demonHunterCards, setDemonHunterCards] =
    React.useState(CoreDemonHunter);
  const [druidCards, setDruidCards] = React.useState(CoreDruid);
  const [hunterCards, setHunterCards] = React.useState(CoreHunter);
  const [mageCards, setMageCards] = React.useState(CoreMage);
  const [paladinCards, setPaladinCards] = React.useState(CorePaladin);
  const [priestCards, setPriestCards] = React.useState(CorePriest);
  const [warriorCards, setWarriorCards] = React.useState(CoreWarrior);
  const [warlockCards, setWarlockCards] = React.useState(CoreWarlock);
  const [shamanCards, setShamanCards] = React.useState(CoreShaman);
  const [rougeCards, setRougeCards] = React.useState(CoreRogue);
  const [neutralCards, setNeutralCards] = React.useState(CoreNeutral);
  const [pageNo, setPageNo] = React.useState(1);
  const [selectedDeck, updateSelectedDeck] = React.useState({});
  const [showPlayerDecks, toggleShowPlayerDecks] = React.useState(true);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
    setPageNo(1);
    switch (newValue) {
      case Deck.DemonHunter:
        setCards(demonHunterCards);
        break;
      case Deck.Druid:
        setCards(druidCards);
        break;
      case Deck.Hunter:
        setCards(hunterCards);
        break;
      case Deck.Mage:
        setCards(mageCards);
        break;
      case Deck.Paladin:
        setCards(paladinCards);
        break;
      case Deck.Priest:
        setCards(priestCards);
        break;
      case Deck.Rouge:
        setCards(rougeCards);
        break;
      case Deck.Shaman:
        setCards(shamanCards);
        break;
      case Deck.Warlock:
        setCards(warlockCards);
        break;
      case Deck.Warrior:
        setCards(warriorCards);
        break;
      default:
        setCards(neutralCards);
    }
  };

  const handleCardImgClick = (card) => {
    // Click will work only if deck is selected
    if (selectedDeck.cards) {
      let count = 0;
      for (let i = 0; i < selectedDeck.cards.length; i++) {
        if (card.id === selectedDeck.cards[i].id) count += 1;
      }
      if (
        (card.rarity === Rarity.Legendary && count === 1) ||
        (card.rarity !== Rarity.Legendary && count === 2)
      ) {
        // Max cards added!! Cancel action!!
        return;
      }
      updateSelectedDeck((prevState) => {
        return { ...prevState, cards: [...prevState.cards, card] };
      });
    }
  };

  let TabHeader;
  let TabContent;
  const TabContentCards = (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      sx={{ minHeight: "260px" }}
    >
      {cards.length === 0 && (
        <Typography variant="h5">No Cards Found.</Typography>
      )}
      {[...cards]
        .sort((a, b) => (a.cost < b.cost ? -1 : a.cost > b.cost ? 1 : 0))
        .slice(
          (pageNo - 1) * 12,
          cards.length - 12 * pageNo > 0
            ? (pageNo - 1) * 12 + 12
            : (pageNo - 1) * 12 + (cards.length - 12 * (pageNo - 1))
        )
        .map((card) => (
          <PlayerCard
            key={card.id}
            card={card}
            handleClick={handleCardImgClick}
          />
        ))}
    </Grid>
  );

  // Update Tab header and content based on selected deck
  if (showPlayerDecks) {
    TabHeader = CardClass.map((item, index) => (
      <Tab key={index} label={item} value={item} />
    ));
    TabContent = CardClass.map((index) => (
      <TabPanel key={index} value={value} index={index}>
        {TabContentCards}
      </TabPanel>
    ));
  } else {
    TabHeader = [selectedDeck.hero, Deck.Neutral].map((item, index) => (
      <Tab key={index} label={item} value={item} />
    ));
    TabContent = [selectedDeck.hero, Deck.Neutral].map((index) => (
      <TabPanel key={index} value={value} index={index}>
        {TabContentCards}
      </TabPanel>
    ));
  }

  return (
    <Card sx={{ m: 1, p: 1, boxShadow: 1 }}>
      <Grid container sx={{ flexGrow: 1, alignItems: "flex-start" }}>
        <Grid item xs={10}>
          <Card sx={{ p: 1 }}>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item sx={{ width: "100%" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs
                    value={value}
                    onChange={handleTabChange}
                    aria-label="basic tabs example"
                  >
                    {TabHeader}
                  </Tabs>
                </Box>
              </Grid>
              {TabContent}
              <Grid item>
                <Pagination
                  count={Math.ceil(cards.length / 12)}
                  variant="outlined"
                  shape="rounded"
                  size="large"
                  page={pageNo}
                  onChange={(e, page) => setPageNo(page)}
                />
              </Grid>
              <Grid item>
                <CardFilter
                  selectedValue={value}
                  actions={{
                    setCards,
                    setDemonHunterCards,
                    setHunterCards,
                    setMageCards,
                    setDruidCards,
                    setPaladinCards,
                    setPriestCards,
                    setRougeCards,
                    setWarlockCards,
                    setShamanCards,
                    setWarriorCards,
                    setNeutralCards,
                  }}
                />
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={2} sx={{ alignItems: "center" }}>
          {showPlayerDecks ? (
            <PlayerDecks
              toggleShowPlayerDecks={toggleShowPlayerDecks}
              updateSelectedDeck={updateSelectedDeck}
              updateTabContent={(value) => handleTabChange(null, value)}
            />
          ) : (
            <CustomDeck
              deck={selectedDeck}
              handleBackClick={() => toggleShowPlayerDecks(true)}
            />
          )}
        </Grid>
      </Grid>
    </Card>
  );
}
