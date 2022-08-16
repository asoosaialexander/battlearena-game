const { Server, Origins } = require("boardgame.io/server");
const { Hearthstone } = require("./components/game/Game.js");

const server = Server({
  games: [Hearthstone],
  origins: [Origins.LOCALHOST],
});

const lobbyConfig = {
  apiPort: 8080,
  apiCallback: () => console.log("Running Lobby API on port 8080..."),
};

server.run({ port: 8000, lobbyConfig });
