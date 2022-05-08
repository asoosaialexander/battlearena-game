import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Pagination,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { APIRoot, CardClass, Deck } from "../common/constants";
import "./Layout.css";
import CardFilter from "./CardFilter";
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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

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
  const [selectedCards, updateSelectedCards] = React.useState([]);
  const [cardCount, setCardCount] = React.useState([]);

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

  return (
    <Box>
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
                      <Tab label={Deck.DemonHunter} value={Deck.DemonHunter} />
                      <Tab label={Deck.Druid} value={Deck.Druid} />
                      <Tab label={Deck.Hunter} value={Deck.Hunter} />
                      <Tab label={Deck.Mage} value={Deck.Mage} />
                      <Tab label={Deck.Paladin} value={Deck.Paladin} />
                      <Tab label={Deck.Priest} value={Deck.Priest} />
                      <Tab label={Deck.Rouge} value={Deck.Rouge} />
                      <Tab label={Deck.Shaman} value={Deck.Warrior} />
                      <Tab label={Deck.Warlock} value={Deck.Warlock} />
                      <Tab label={Deck.Warrior} value={Deck.Warrior} />
                      <Tab label={Deck.Neutral} value={Deck.Neutral} />
                    </Tabs>
                  </Box>
                  {CardClass.map((index) => (
                    <TabPanel key={index} value={value} index={index}>
                      <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        sx={{ minHeight: "260px" }}
                      >
                        {cards.length === 0 && (
                          <Typography variant="h5">No Cards Found.</Typography>
                        )}
                        {cards
                          .sort((a, b) =>
                            a.cost < b.cost ? -1 : a.cost > b.cost ? 1 : 0
                          )
                          .slice(
                            (pageNo - 1) * 12,
                            cards.length - 12 * pageNo > 0
                              ? (pageNo - 1) * 12 + 12
                              : (pageNo - 1) * 12 +
                                  (cards.length - 12 * (pageNo - 1))
                          )
                          .map((card) => {
                            return (
                              <Paper key={card.id} elevation={0}>
                                <img
                                  src={`${APIRoot}/render/latest/enUS/256x/${card.id}.png`}
                                  alt="CardGraphics"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => {
                                    let count = 0;
                                    for (
                                      let i = 0;
                                      i < selectedCards.length;
                                      i++
                                    ) {
                                      if (card.id === selectedCards[i].id)
                                        count += 1;
                                    }
                                    if (
                                      (card.rarity === "LEGENDARY" &&
                                        count === 1) ||
                                      (card.rarity !== "LEGENDARY" &&
                                        count === 2)
                                    ) {
                                      console.log("Max cards added!");
                                      return;
                                    }
                                    updateSelectedCards((prevState) => [
                                      ...prevState,
                                      card,
                                    ]);
                                    if (count === 0) {
                                      setCardCount((prevState) => [
                                        ...prevState,
                                        {
                                          id: card.id,
                                          count: 1,
                                        },
                                      ]);
                                    } else {
                                      setCardCount((prevState) => {
                                        prevState.find(
                                          (c) => c.id === card.id
                                        ).count = 2;
                                        return prevState;
                                      });
                                    }
                                  }}
                                />
                              </Paper>
                            );
                          })}
                      </Grid>
                    </TabPanel>
                  ))}
                </Grid>
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
            <Card sx={{ p: 1, marginLeft: 1 }}>
              <CardHeader title="Custom Deck" subheader="Mage"></CardHeader>
              <CardContent>
                {[...new Set(selectedCards)].map((card) => (
                  <Paper
                    elevation={0}
                    sx={{ position: "relative" }}
                    key={card.id}
                  >
                    <img
                      className="selectedCard"
                      src={`${APIRoot}/tiles/${card.id}.jpg`}
                      alt={card.name}
                    />
                    <Typography variant="body" className="noOfCards">
                      {cardCount.find((c) => c.id === card.id).count}
                    </Typography>
                  </Paper>
                ))}
              </CardContent>
              <CardActions>
                <Typography variant="h6">
                  {selectedCards.length}/30 Cards
                </Typography>
                <Button size="large" variant="outlined" color="primary">
                  Save
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}
