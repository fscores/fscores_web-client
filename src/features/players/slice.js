import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPlayers, fetchPlayerById } from "./api";

// Async thunk example
export const loadPlayers = createAsyncThunk(
  "players/load",
  async ({ searchOptions = {}, pageNo = 0, pageSize = 10, sortBy = "id" }) => {
    const response = await fetchPlayers(searchOptions, pageNo, pageSize, sortBy);
    console.log("Fetched players:", response);
    return response;
  }
);

export const loadPlayerDetail = createAsyncThunk(
  "players/loadDetail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetchPlayerById(id);
      if (!response.success) {
        return rejectWithValue(response.message || "Failed to fetch player");
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const playersSlice = createSlice({
  name: "players",
  initialState: {
    list: [],
    metadata: null,
    detail: null,
    loading: false,
    detailLoading: false,
    error: null,
    detailError: null,
  },
  reducers: {
    // 💡 FIX: Added the clearPlayerDetail reducer
    clearPlayerDetail: (state) => {
      state.detail = null;
      state.detailError = null;
    },
    // The previous export { addPlayer } was unused; replacing it with a clear utility.
    clearPlayerListError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPlayers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadPlayers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data;
        state.metadata = action.payload.meta;
      })
      .addCase(loadPlayers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(loadPlayerDetail.pending, (state) => {
        state.detailLoading = true;
        state.detailError = null;
      })
      .addCase(loadPlayerDetail.fulfilled, (state, action) => {
        state.detailLoading = false;
        state.detail = action.payload;
      })
      .addCase(loadPlayerDetail.rejected, (state, action) => {
        state.detailLoading = false;
        state.detailError = action.payload;
      });
  },
});

export const { clearPlayerDetail, clearPlayerListError } = playersSlice.actions;
export default playersSlice.reducer;
