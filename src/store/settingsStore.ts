import superjson from "superjson";
import { create } from "zustand";
import { PersistStorage, persist } from "zustand/middleware";

import { StopBookmark } from "../models/etaObjects.js";

type SettingsState = {
  unifiedEta: boolean;
  devMode: boolean;
  defaultHomeTab: string;
  defaultProvideLocation?: boolean;
  stopBookmarks: Map<number, StopBookmark>;
  subwayStops: Map<number, { name: string }>;
};

type SettingsActions = {
  setUnifiedEta: (value: boolean) => void;
  setDevMode: (value: boolean) => void;
  setDefaultHomeTab: (value: string) => void;
  setDefaultProvideLocation: (value: boolean) => void;
  setSettings: (value: SettingsState) => void;
};

const storage: PersistStorage<SettingsState> = {
  getItem: (name) => {
    const str = localStorage.getItem(name);
    if (!str) return null;
    return superjson.parse(str);
  },
  setItem: (name, value) => {
    localStorage.setItem(name, superjson.stringify(value));
  },
  removeItem: (name) => localStorage.removeItem(name),
};

export const useSettingsStore = create<SettingsState & SettingsActions>()(
  persist(
    (set) => ({
      unifiedEta: true,
      devMode: false,
      defaultHomeTab: "favourites",
      defaultProvideLocation: undefined,
      setUnifiedEta: (value: boolean) => set({ unifiedEta: value }),
      setDevMode: (value: boolean) => set({ devMode: value }),
      setDefaultHomeTab: (value: string) => set({ defaultHomeTab: value }),
      setDefaultProvideLocation: (value: boolean) =>
        set({ defaultProvideLocation: value }),
      setSettings: (value: SettingsState) => set(value),
      stopBookmarks: new Map(),
      subwayStops: new Map(),
    }),
    { name: "settings-storage", storage }
  )
);
