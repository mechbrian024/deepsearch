import { configureStore } from "@reduxjs/toolkit";
import playlistReducer from "../state/playlistSlice";

export const store = configureStore({
  reducer: {
    playlists: playlistReducer,
    // ... other reducers
  },
});
