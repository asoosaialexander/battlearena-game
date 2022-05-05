import {
  Button,
  Card,
  CardActionArea,
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
import { CardClass, CardType, Deck } from "../game/common";
import CoreNeutral from "./../data/core-neutral.json";
import CoreDemonHunter from "./../data/core-demonhunter.json";
import CoreDruid from "./../data/core-druid.json";
import CoreHunter from "./../data/core-hunter.json";
import CoreMage from "./../data/core-mage.json";
import CorePaladin from "./../data/core-paladin.json";
import CorePriest from "./../data/core-priest.json";
import CoreRogue from "./../data/core-rogue.json";
import CoreShaman from "./../data/core-shaman.json";
import CoreWarlock from "./../data/core-warlock.json";
import CoreWarrior from "./../data/core-warrior.json";
import SpellCard from "../game/SpellCard";
import MinionCard from "../game/MinionCard";

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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function DeckBuilderLayout() {
  const [value, setValue] = React.useState(Deck.DemonHunter);
  const [cards, setCards] = React.useState(CoreDemonHunter);
  const [pageNo, setPageNo] = React.useState(1);
  const [selectedCards, updateSelectedCards] = React.useState([]);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
    setPageNo(1);
    switch (newValue) {
      case Deck.DemonHunter:
        setCards(CoreDemonHunter);
        break;
      case Deck.Druid:
        setCards(CoreDruid);
        break;
      case Deck.Hunter:
        setCards(CoreHunter);
        break;
      case Deck.Mage:
        setCards(CoreMage);
        break;
      case Deck.Paladin:
        setCards(CorePaladin);
        break;
      case Deck.Priest:
        setCards(CorePriest);
        break;
      case Deck.Rouge:
        setCards(CoreRogue);
        break;
      case Deck.Shaman:
        setCards(CoreShaman);
        break;
      case Deck.Warlock:
        setCards(CoreWarlock);
        break;
      case Deck.Warrior:
        setCards(CoreWarrior);
        break;
      default:
        setCards(CoreNeutral);
    }
  };

  return (
    <Box>
      <Card sx={{ m: 1, p: 1, boxShadow: 1 }}>
        <Grid container sx={{ flexGrow: 1, alignItems: "flex-start" }}>
          <Grid item xs={10}>
            <Card sx={{ p: 1 }}>
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
                    {[...cards]
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
                          <Paper elevation={0}>
                            <img
                              src={`https://art.hearthstonejson.com/v1/render/latest/enUS/256x/${card.id}.png`}
                              alt="CardGraphics"
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                updateSelectedCards((prevState) => [
                                  ...prevState,
                                  card,
                                ])
                              }
                            />
                          </Paper>
                        );
                      })}
                  </Grid>
                </TabPanel>
              ))}
              <Pagination
                count={Math.ceil(cards.length / 12)}
                variant="outlined"
                shape="rounded"
                size="large"
                page={pageNo}
                onChange={(e, page) => setPageNo(page)}
              />
            </Card>
          </Grid>
          <Grid item xs={2} sx={{ alignItems: "center" }}>
            <Card sx={{ p: 1, marginLeft: 1 }}>
              <CardHeader title="Custom Deck" subheader="Mage"></CardHeader>
              <CardContent>
                {selectedCards.map((card) => (
                  <img
                    key={card.id}
                    src={`https://art.hearthstonejson.com/v1/tiles/${card.id}.jpg`}
                    alt={card.name}
                  />
                ))}
              </CardContent>
              <CardActionArea>
                <Typography variant="overline">{selectedCards.length}/30 Cards</Typography>{" "}
                <Button size="large" variant="outlined" color="primary">
                  Save
                </Button>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}
