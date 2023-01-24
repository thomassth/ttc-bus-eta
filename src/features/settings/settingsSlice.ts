import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { loadSettingsState } from "./localstorage";

const persistedState = loadSettingsState();

export interface settingsItem {
  id: number;
  name: string;
  value: string;
}

export const settingsAdapter = createEntityAdapter({
  selectId: (setting: settingsItem) => setting.id,
  sortComparer: (a, b) => a.id - b.id,
});
const initialState =
  Object.keys(persistedState).length === 0
    ? { ids: [], entities: {} }
    : persistedState;

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    changeSettings: settingsAdapter.setOne,
    removeSettings: settingsAdapter.removeOne,
    clearSettings: settingsAdapter.removeAll,
  },
});

export const { changeSettings, removeSettings, clearSettings } =
  settingsSlice.actions;
