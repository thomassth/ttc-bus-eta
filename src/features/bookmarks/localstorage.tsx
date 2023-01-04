export const loadState = () => {
  try {
    const serialState = localStorage.getItem("appState");
    if (serialState === null) {
      return { ids: [], entities: {} };
    }
    return JSON.parse(serialState);
  } catch (err) {
    console.log(err);
  }
};

export const saveState = (state: any) => {
  try {
    const serialState = JSON.stringify(state);
    localStorage.setItem("appState", serialState);
    localStorage.setItem("version", "1");
  } catch (err) {
    console.log(err);
  }
};
