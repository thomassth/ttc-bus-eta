import {
  createSlice,
  PayloadAction,
  createEntityAdapter,
} from "@reduxjs/toolkit";

export interface StopBookmark {
  stopId: number;
  name: string;
  ttcId: number;
}

const stopBookmarksAdapter = createEntityAdapter({
  selectId: (stopBookmark: StopBookmark) => stopBookmark.stopId,
});

const initialState = stopBookmarksAdapter.getInitialState();

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
