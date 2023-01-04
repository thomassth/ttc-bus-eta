import {
  PayloadAction,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";

import { loadState } from "./localstorage";

export interface StopBookmark {
  stopId: number;
  name: string;
  ttcId: number;
}

const persistedState = loadState();

const stopBookmarksAdapter = createEntityAdapter({
  selectId: (stopBookmark: StopBookmark) => stopBookmark.stopId,
  sortComparer: (a, b) => a.stopId - b.stopId,
});
const initialState =
  Object.keys(persistedState).length === 0
    ? { ids: [], entities: {} }
    : persistedState;

const stopBookmarksSlice = createSlice({
  name: "stopBookmarks",
  initialState,
  reducers: {
    addStopBookmark: (state, input: PayloadAction<StopBookmark>) => {
      stopBookmarksAdapter.addOne(state, input.payload);
    },
    clearStopBookmarks: (state) => {
      stopBookmarksAdapter.removeAll(state);
    },
  },
});

export const { addStopBookmark, clearStopBookmarks } =
  stopBookmarksSlice.actions;

export default stopBookmarksSlice.reducer;
