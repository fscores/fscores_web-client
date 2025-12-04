// src/features/clubs/clubsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchClubs,
  fetchClubById,
  fetchClubByPlayerId,
} from "./api"; // adjust path if needed

// Load paginated list of clubs
export const loadClubs = createAsyncThunk(
  "clubs/loadClubs",
  async ({ searchOptions = {}, pageNo = 0, pageSize = 10, sortBy = "id" }) => {
    const response = await fetchClubs(searchOptions, pageNo, pageSize, sortBy);
    return response;
  }
);

// Load single club by ID
export const loadClubDetail = createAsyncThunk(
  "clubs/loadClubDetail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetchClubById(id);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Network error"
      );
    }
  }
);

// Load club(s) linked to a specific player
export const loadClubByPlayerId = createAsyncThunk(
  "clubs/loadClubByPlayerId",
  async (playerId, { rejectWithValue }) => {
    try {
      const response = await fetchClubByPlayerId(playerId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Network error"
      );
    }
  }
);

const clubsSlice = createSlice({
  name: "clubs",
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
    clearClubDetail: (state) => {
      state.detail = null;
      state.detailError = null;
    },
    clearClubByPlayer: (state) => {
      state.clubByPlayer = null;
      state.clubByPlayerError = null;
    },
    clearClubListError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // List + pagination
      .addCase(loadClubs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadClubs.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data;
        state.metadata = action.payload.meta;
      })
      .addCase(loadClubs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Single club detail
      .addCase(loadClubDetail.pending, (state) => {
        state.detailLoading = true;
        state.detailError = null;
      })
      .addCase(loadClubDetail.fulfilled, (state, action) => {
        state.detailLoading = false;
        state.detail = action.payload;
      })
      .addCase(loadClubDetail.rejected, (state, action) => {
        state.detailLoading = false;
        state.detailError = action.payload || action.error.message;
      })

      // Club by player ID
      .addCase(loadClubByPlayerId.pending, (state) => {
        state.clubByPlayerLoading = true;
        state.clubByPlayerError = null;
      })
      .addCase(loadClubByPlayerId.fulfilled, (state, action) => {
        state.clubByPlayerLoading = false;
        state.clubByPlayer = action.payload;
      })
      .addCase(loadClubByPlayerId.rejected, (state, action) => {
        state.clubByPlayerLoading = false;
        state.clubByPlayerError = action.payload || action.error.message;
      });
  },
});

export const { clearClubDetail, clearClubByPlayer, clearClubListError } =
  clubsSlice.actions;

export default clubsSlice.reducer;