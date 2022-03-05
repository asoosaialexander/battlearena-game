import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  playerHero: {},
  enemyHero: {},
  playerMinions: [],
  enemyMinions: [],
};

export const playAreaSlice = createSlice({
  name: "playArea",
  initialState,
  reducers: {
    addPlayerMinion: (state, action) => {
      if (state.playerMinions.length < 7)
        state.playerMinions.push(action.payload);
    },
  },
});

export const selectPlayerMinions = (state) => state.playArea.playerMinions;
export const selectEnemyMinions = (state) => state.playArea.enemyMinions;

export const { addPlayerMinion } = playAreaSlice.actions;

export default playAreaSlice.reducer;
