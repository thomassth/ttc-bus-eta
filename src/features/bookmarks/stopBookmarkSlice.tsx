import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { StopBookmark } from "../../data/EtaObjects";
import { loadState } from "./localstorage";

const persistedState = loadState();

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
