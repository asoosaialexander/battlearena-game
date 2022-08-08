const { Server, Origins } = require('boardgame.io/server');
const { Hearthstone } = require('./components/game/Game.js')

const server = Server({
  games: [Hearthstone],
  origins: [Origins.LOCALHOST],
});

server.run(8000);