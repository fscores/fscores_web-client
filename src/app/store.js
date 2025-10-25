import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "../features/players/slice";

export const store = configureStore({
  reducer: {
    players: playerReducer
  },
});

export default store;
