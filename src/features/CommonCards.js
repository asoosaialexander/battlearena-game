import { CardType, Deck, MinionType, SpellType } from "./common";

export const AcidicSwampOoze = {
  name: "Acidic Swamp Ooze",
  cost: 2,
  attack: 3,
  health: 2,
  deck: Deck.Common,
  type: CardType.Minion,
  description: "Battlecry: Destroy your opponent's weapon.",
};

export const BloodfenRaptor = {
  name: "Bloodfen Raptor",
  cost: 2,
  attack: 3,
  health: 2,
  deck: Deck.Common,
  type: CardType.Minion,
  subType: MinionType.Beast,
};

export const SenjinShieldMasta = {
  name: "Sen'jin ShieldMasta",
  cost: 4,
  attack: 3,
  health: 5,
  deck: Deck.Common,
  type: CardType.Minion,
  description: "Taunt",
};
