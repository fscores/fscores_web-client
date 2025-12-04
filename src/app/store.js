import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "../features/players/slice";
import clubReducer from "../features/clubs/slice";

export const store = configureStore({
  reducer: {
    players: playerReducer,
    clubs: clubReducer
  },
});

export default store;
