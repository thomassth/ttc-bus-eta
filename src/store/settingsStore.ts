import { create } from "zustand";
import { persist } from "zustand/middleware";

type SettingsStore = {
  unifiedEta: boolean;
  devMode: boolean;
  defaultHomeTab: string;
  defaultProvideLocation?: boolean;
};

type SettingsActions = {
  setUnifiedEta: (value: boolean) => void;
  setDevMode: (value: boolean) => void;
  setDefaultHomeTab: (value: string) => void;
  setDefaultProvideLocation: (value: boolean) => void;
  setSettings: (value: SettingsStore) => void;
};

export const useSettingsStore = create<SettingsStore & SettingsActions>()(
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
      setSettings: (value: SettingsStore) => set(value),
    }),
    { name: "settings-storage" }
  )
);
