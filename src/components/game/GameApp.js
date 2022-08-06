import { Client } from "boardgame.io/react";
import ArenaLayout from "./ArenaLayout";
import { Hearthstone } from "./Game";

const GameApp = Client({ game: Hearthstone, board: ArenaLayout });

export default GameApp;
