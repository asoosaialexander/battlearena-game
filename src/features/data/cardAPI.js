import CoreMage from "./core-mage.json";
import CoreNeutral from "./core-neutral.json";
import CorePriest from "./core-priest.json";

export function fetchCards(deck, cardClass) {
  let data;
  switch (deck) {
    case "core":
      switch (cardClass) {
        case "mage":
          data = CoreMage;
          break;
        case "priest":
          data = CorePriest;
          break;
        case "neutral":
          data = CoreNeutral;
          break;
        default:
          data = {};
      }
      break;
    default:
      data = {};
  }

  return new Promise((resolve) =>
    setTimeout(() => resolve({ data }), 500)
  );
}
