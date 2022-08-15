export const CardClass = [
  "DEMONHUNTER",
  "DRUID",
  "HUNTER",
  "MAGE",
  "PALADIN",
  "PRIEST",
  "ROGUE",
  "SHAMAN",
  "WARLOCK",
  "WARRIOR",
  "NEUTRAL",
];

export const Deck = {
  Neutral: "NEUTRAL",
  DemonHunter: "DEMONHUNTER",
  Druid: "DRUID",
  Hunter: "HUNTER",
  Mage: "MAGE",
  Paladin: "PALADIN",
  Priest: "PRIEST",
  Rogue: "ROGUE",
  Shaman: "SHAMAN",
  Warlock: "WARLOCK",
  Warrior: "WARRIOR",
};

export const CardType = {
  Minion: "MINION",
  Spell: "SPELL",
};

export const SpellType = {
  Frost: "Frost",
  Arcane: "Arcane",
  Fire: "Fire",
};

export const MinionType = {
  Beast: "Beast",
  Elemental: "Elemental",
};

export const Rarity = {
  Legendary: "LEGENDARY",
};

export const Mechanics = {
  Poisonous: "POISONOUS",
  Stealth: "STEALTH",
  Deathrattle: "DEATHRATTLE",
  Taunt: "TAUNT",
  Charge: "CHARGE",
};

export const Spell = {
  ArcaneIntellect: "Arcane Intellect",
  Flamestrike: "Flamestrike",
  Coin: "Coin",
};

export const Power = {
  DemonClaws: "Demon Claws", //+1 attack this turn
  Fireblast: "Fireblast", // deal 1 damage
  TotemicCall: "Totemic Call", //summon a random Totem
  ArmorUp: "Armor Up" //Gain 2 armor
};

export const APIRoot = "https://art.hearthstonejson.com/v1";
export const ServerRoot =
  "https://battlearena-api-default-rtdb.firebaseio.com/";

export const CoinFace = {
  Heads: "Heads",
  Tails: "Tails",
};

export const HeroPower = {
  DEMONHUNTER: {
    cost: 1,
    power: Power.DemonClaws,
  },
  MAGE: {
    cost: 2,
    power: Power.Fireblast,
  },
  SHAMAN: {
    cost: 2,
    power: Power.TotemicCall
  },
  WARRIOR:{
    cost:2,
    power: Power.ArmorUp
  }
};
