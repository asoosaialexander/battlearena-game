import { CoinFace } from "./constants";

export const random = (maxValue) => {
  return Math.floor(Math.random() * (maxValue - 1 + 1)) + 1;
};

export const shuffle = (list) => {
  let n = list.length;
  while (n > 1) {
    const r = random(n) - 1;
    n--;
    const temp = list[r];
    list[r] = list[n];
    list[n] = temp;
  }
};

export const tossACoin = () => (random(2) === 1 ? CoinFace.Heads : CoinFace.Tails);
