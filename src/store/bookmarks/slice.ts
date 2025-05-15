import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import type { StopBookmark } from "../../models/etaObjects.js";
import { loadStopBookmarkState } from "./state.js";

const persistedState = loadStopBookmarkState();

const stopBookmarksAdapter = createEntityAdapter({
  selectId: (stopBookmark: StopBookmark) => stopBookmark.stopId,
  sortComparer: (a, b) => a.stopId - b.stopId,
});
const initialState =
  Object.keys(persistedState).length === 0
    ? { ids: [], entities: {} }
    : persistedState;

export const stopBookmarksSelectors = stopBookmarksAdapter.getSelectors();

export const stopBookmarksSlice = createSlice({
  name: "stopBookmarks",
  initialState,
  reducers: {
    addStopBookmark: stopBookmarksAdapter.addOne,
    editStopBookmark: stopBookmarksAdapter.updateOne,
    removeStopBookmark: stopBookmarksAdapter.removeOne,
    clearStopBookmarks: stopBookmarksAdapter.removeAll,
  },
});

export const {
  addStopBookmark,
  editStopBookmark,
  clearStopBookmarks,
  removeStopBookmark,
} = stopBookmarksSlice.actions;
