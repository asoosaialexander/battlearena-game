import { ServerRoot } from "../components/common/constants";
import axios from "axios";

const playerDeckApi = {
  getAllPlayerDecks: () => axios.get(ServerRoot + "playerDecks.json"),
  addPlayerDeck: (deck) => {
    axios.post(ServerRoot + "playerDecks.json", deck).then((res) => {
      console.log(`${res.status} ${res.statusText}`);
    });
  },
  updatePlayerDeck: (deck) => {
    axios
      .put(ServerRoot + "playerDecks/" + deck.id + ".json", deck)
      .then((res) => {
        console.log(`${res.status} ${res.statusText}`);
      });
  },
  deletePlayerDeck: (id) => {
    axios.delete(ServerRoot + "playerDecks/" + id + ".json").then((res) => {
      console.log(`${res.status} ${res.statusText}`);
    });
  },
};

export const {
  getAllPlayerDecks,
  addPlayerDeck,
  updatePlayerDeck,
  deletePlayerDeck,
} = playerDeckApi;
