import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { loadSubwayDbState } from "./state.js";

const persistedState = loadSubwayDbState();

const subwayDbAdapter = createEntityAdapter({
  selectId: (subwayStop: { id: number; stop: { name: string } }) =>
    subwayStop.id,
});
const initialState =
  Object.keys(persistedState).length === 0
    ? { ids: [], entities: {} }
    : persistedState;

export const subwayDbSlice = createSlice({
  name: "subwayDb",
  initialState,
  reducers: {
    addStop: subwayDbAdapter.setOne,
    addStops: subwayDbAdapter.setMany,
    clearStops: subwayDbAdapter.removeAll,
  },
});

export const subwayDbSelectors = subwayDbAdapter.getSelectors();

export const { addStop, addStops, clearStops } = subwayDbSlice.actions;
