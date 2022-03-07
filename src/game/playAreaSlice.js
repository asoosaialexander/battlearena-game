import { createSlice } from "@reduxjs/toolkit";
import { Mechanics } from "./common";

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
    dealDamage: (state, action) => {
      const targetId = action.payload.target;
      const damage = action.payload.damage;
      const player = action.payload.player;

      if (player === "self") {
        const targetIndex = state.enemyMinions.findIndex(
          (m) => m.id === targetId
        );
        state.enemyMinions[targetIndex].health -= damage;
        if (state.enemyMinions[targetIndex].health <= 0)
          state.enemyMinions.splice(targetIndex, 1);
      } else {
        const targetIndex = state.selfMinions.findIndex(
          (m) => m.id === targetId
        );
        state.selfMinions[targetIndex].health -= damage;
        if (state.selfMinions[targetIndex].health <= 0)
          state.selfMinions.splice(targetIndex, 1);
      }
    },
    attackMinion: (state, action) => {
      const attackerId = action.payload.attacker;
      const targetId = action.payload.target;
      const player = action.payload.player;

      if (player === "self") {
        const attackerIndex = state.selfMinions.findIndex(
          (m) => m.id === attackerId
        );
        const targetIndex = state.enemyMinions.findIndex(
          (m) => m.id === targetId
        );

        state.enemyMinions[targetIndex].health -=
          state.selfMinions[attackerIndex].attack;
        state.selfMinions[attackerIndex].health -=
          state.enemyMinions[targetIndex].attack;

        if (
          state.enemyMinions[targetIndex].health <= 0 ||
          state.selfMinions[attackerIndex].mechanics?.includes(
            Mechanics.Poisonous
          )
        )
          state.enemyMinions.splice(targetIndex, 1);

        if (
          state.selfMinions[attackerIndex].health <= 0 ||
          state.enemyMinions[targetIndex].mechanics?.includes(
            Mechanics.Poisonous
          )
        )
          state.selfMinions.splice(attackerIndex, 1);
      } else {
        const attackerIndex = state.enemyMinions.findIndex(
          (m) => m.id === attackerId
        );
        const targetIndex = state.selfMinions.findIndex(
          (m) => m.id === targetId
        );

        state.selfMinions[targetIndex].health -=
          state.enemyMinions[attackerIndex].attack;
        state.enemyMinions[attackerIndex].health -=
          state.selfMinions[targetIndex].attack;

        if (
          state.selfMinions[targetIndex].health <= 0 ||
          state.enemyMinions[attackerIndex].mechanics?.includes(
            Mechanics.Poisonous
          )
        )
          state.selfMinions.splice(targetIndex, 1);

        if (
          state.enemyMinions[attackerIndex].health <= 0 ||
          state.selfMinions[targetIndex].mechanics?.includes(
            Mechanics.Poisonous
          )
        )
          state.enemyMinions.splice(attackerIndex, 1);
      }
    },
  },
});

export const selectSelfMinions = (state) => state.playArea.selfMinions;
export const selectEnemyMinions = (state) => state.playArea.enemyMinions;

export const { playMinion, attackMinion, dealDamage } =
  playAreaSlice.actions;

export default playAreaSlice.reducer;
