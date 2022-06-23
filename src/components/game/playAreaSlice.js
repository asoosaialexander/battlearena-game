import { createSlice } from "@reduxjs/toolkit";
import { Mechanics } from "../common/constants";

const initialState = {
  selfEnergy: 1,
  selfHero: {
    isAlive: true,
    attack: 0,
    health: 30,
    fatigue: 1,
  },
  enemyEnergy: 1,
  enemyHero: {
    isAlive: true,
    attack: 0,
    health: 30,
    fatigue: 1,
  },
  selfMinions: [],
  enemyMinions: [],
};

export const playAreaSlice = createSlice({
  name: "playArea",
  initialState,
  reducers: {
    playMinion: (state, action) => {
      const card = action.payload.card;
      const player = action.payload.player;
      if (player === "self" && state.selfMinions.length < 7)
        state.selfMinions.push(card);
      if (player === "enemy" && state.enemyMinions.length < 7)
        state.enemyMinions.push(card);
    },
    clearDeadMinions: (state) => {
      state.selfMinions = state.selfMinions.filter((m) => m.health > 0);
      state.enemyMinions = state.enemyMinions.filter((m) => m.health > 0);
    },
    attackMinionWithMinion: (state, action) => {
      const sId = action.payload.selfMinionId;
      const eId = action.payload.enemyMinionId;

      const sI = state.selfMinions.findIndex((m) => m.id === sId);
      const eI = state.enemyMinions.findIndex((m) => m.id === eId);

      state.enemyMinions[eI].health -= state.selfMinions[sI].attack;
      state.selfMinions[sI].health -= state.enemyMinions[eI].attack;

      //Logic for Poisonous Minion
      if (state.selfMinions[sI].mechanics?.includes(Mechanics.Poisonous))
        state.enemyMinions.splice(eI, 1);

      if (state.enemyMinions[eI].mechanics?.includes(Mechanics.Poisonous))
        state.selfMinions.splice(sI, 1);
    },
    attackMinionWithDamage: (state, action) => {
      const tId = action.payload.target;
      const damage = action.payload.damage;
      const player = action.payload.player;

      if (player === "self") {
        const tI = state.enemyMinions.findIndex((m) => m.id === tId);
        state.enemyMinions[tI].health -= damage;
      } else {
        const tI = state.selfMinions.findIndex((m) => m.id === tId);
        state.selfMinions[tI].health -= damage;
      }
    },
    attackAllMinionsWithDamage: (state, action) => {
      const damage = action.payload.damage;
      const player = action.payload.player;

      if (player === "self") {
        for (var i = 0; i < state.enemyMinions.length; i++) {
          state.enemyMinions[i].health -= damage;
        }
      } else {
        for (var j = 0; j < state.selfMinions.length; j++) {
          state.selfMinions[j].health -= damage;
        }
      }
    },
  },
});

export const selectSelfMinions = (state) => state.playArea.selfMinions;
export const selectEnemyMinions = (state) => state.playArea.enemyMinions;

export const {
  playMinion,
  clearDeadMinions,
  attackMinionWithMinion,
  attackMinionWithDamage,
  attackAllMinionsWithDamage,
} = playAreaSlice.actions;

export default playAreaSlice.reducer;
