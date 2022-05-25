import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { playerDeckApi } from "../../services/playerDeck";

export const getAllPlayerDecks = createAsyncThunk("playerDecks/", async (thunkAPI) => {
  const response = await playerDeckApi.useGetAllPlayerDecksQuery();
  return response.data;
});

const initialState = {
  playerDecks: [],
};

export const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllPlayerDecks.fulfilled, (state, action) => {
      state.playerDecks.push(action.payload);
    });
  },
});

export default collectionSlice.reducer;
