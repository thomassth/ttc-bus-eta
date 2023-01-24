export const loadSettingsState = () => {
  try {
    const serialState = localStorage.getItem("appSettings");
    if (serialState === null) {
      return { ids: [], entities: {} };
    }
    return JSON.parse(serialState);
  } catch (err) {
    console.log(err);
    return { ids: [], entities: {} };
  }
};

export const saveSettingsState = (state: {
  id: number[];
  entities: { stopId: number; name: string; ttcId: number };
}) => {
  try {
    const serialState = JSON.stringify(state);
    localStorage.setItem("appSettings", serialState);
    localStorage.setItem("version", "1");
  } catch (err) {
    console.log(err);
  }
};
