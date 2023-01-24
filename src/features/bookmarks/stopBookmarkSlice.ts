import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { StopBookmark } from "../../data/etaObjects";
import { loadStopBookmarkState } from "./localstorage";

const persistedState = loadStopBookmarkState();

const stopBookmarksAdapter = createEntityAdapter({
  selectId: (stopBookmark: StopBookmark) => stopBookmark.stopId,
  sortComparer: (a, b) => a.stopId - b.stopId,
});
const initialState =
  Object.keys(persistedState).length === 0
    ? { ids: [], entities: {} }
    : persistedState;

export const stopBookmarksSlice = createSlice({
  name: "stopBookmarks",
  initialState,
  reducers: {
    addStopBookmark: stopBookmarksAdapter.addOne,
    removeStopBookmark: stopBookmarksAdapter.removeOne,
    clearStopBookmarks: stopBookmarksAdapter.removeAll,
  },
});

export const { addStopBookmark, clearStopBookmarks, removeStopBookmark } =
  stopBookmarksSlice.actions;
