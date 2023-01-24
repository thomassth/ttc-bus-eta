export const loadStopBookmarkState = () => {
  try {
    const serialState = localStorage.getItem("stopBookmarks");
    if (serialState === null) {
      return { ids: [], entities: {} };
    }
    return JSON.parse(serialState);
  } catch (err) {
    console.log(err);
    return { ids: [], entities: {} };
  }
};

export const saveStopBookmarkState = (state: {
  id: number[];
  entities: { id: number; name: string; value: string };
}) => {
  try {
    const serialState = JSON.stringify(state);
    localStorage.setItem("stopBookmarks", serialState);
    localStorage.setItem("version", "1");
  } catch (err) {
    console.log(err);
  }
};
