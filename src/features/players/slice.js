import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPlayers } from "./api";

// Async thunk example
export const loadPlayers = createAsyncThunk(
  "players/load",
  async ({ searchOptions = {}, pageNo = 0, pageSize = 10, sortBy = "id" }) => {
    const response = await fetchPlayers(searchOptions, pageNo, pageSize, sortBy);
    return response;
  }
);

const playersSlice = createSlice({
  name: "players",
  initialState: {
    list: [],
    metadata: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadPlayers.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadPlayers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.players;
        state.metadata = action.payload;
      })
      .addCase(loadPlayers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addPlayer } = playersSlice.actions;
export default playersSlice.reducer;
