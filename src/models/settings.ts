export interface settingsItem {
  id: string;
  name: string;
  value: string;
}

export interface settingsRedux {
  ids: string[];
  entities: settingsItem[];
}
