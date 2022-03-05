import { CardType, Deck, MinionType, SpellType } from "./common";

export const Frostbolt = {
  name: "Frostbolt",
  cost: 1,
  deck: Deck.Mage,
  type: CardType.Spell,
  subType: SpellType.Frost,
  description: "Deal 3 damage to a character and Freeze it.",
};

export const ArcaneIntellect = {
  name: "Arcane Intellect",
  cost: 3,
  deck: Deck.Mage,
  type: CardType.Spell,
  subType: SpellType.Arcane,
  description: "Draw 2 cards.",
};

export const Fireball = {
  name: "Fireball",
  cost: 4,
  deck: Deck.Mage,
  type: CardType.Spell,
  subType: SpellType.Fire,
  description: "Deal 6 damage.",
};

export const Polymorph = {
  name: "Polymorph",
  cost: 4,
  deck: Deck.Mage,
  type: CardType.Spell,
  subType: SpellType.Arcane,
  description: "Transform a minion into a 1/1 sheep.",
};

export const WaterElemental = {
  name: "Water Elemental",
  cost: 4,
  attack: 3,
  health: 6,
  deck: Deck.Mage,
  type: CardType.Minion,
  subType: MinionType.Elemental,
  description: "Freeze any character damaged by this minion.",
};
