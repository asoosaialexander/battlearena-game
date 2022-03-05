import React from "react";
import MinionCard from "./MinionCard";
import { Deck, CardType } from "./common";
import SpellCard from "./SpellCard";
import Minion from "./Minion";

export default function MinionArea(props) {
  const { cards } = props;
  console.log("alex", cards[0]);
  return (
    <>
      <Minion card={cards[3]} />
      {/* {cards.map((card) => {
        switch (card.type) {
          case CardType.Minion:
            return <MinionCard card={card} />;
          case CardType.Spell:
            return <SpellCard card={card} />;
          default:
            return <MinionCard card={card} />;
        }
      })} */}
    </>
  );
}
