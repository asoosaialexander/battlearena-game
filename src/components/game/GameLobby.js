import { Lobby } from "boardgame.io/react";
import { Hearthstone } from "./Game";
import ArenaLayout from "./ArenaLayout";

export default function GameLobby() {
  return (
    <Lobby
      gameServer={`https://${window.location.hostname}:8000`}
      lobbyServer={`https://${window.location.hostname}:8080`}
      gameComponents={[{ game: Hearthstone, board: ArenaLayout }]}
    />
  );
}
