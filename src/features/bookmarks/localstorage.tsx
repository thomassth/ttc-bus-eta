export const loadState = () => {
  try {
    const serialState = localStorage.getItem("appState");
    if (serialState === null) {
      return { ids: [], entities: {} };
    }
    return JSON.parse(serialState);
  } catch (err) {
    console.log(err);
    return { ids: [], entities: {} };
  }
};

export const saveState = (state: {
  id: number[];
  entities: { stopId: number; name: string; ttcId: number };
}) => {
  try {
    const serialState = JSON.stringify(state);
    localStorage.setItem("appState", serialState);
    localStorage.setItem("version", "1");
  } catch (err) {
    console.log(err);
  }
};
