export const loadSubwayDbState = () => {
  try {
    const serialState = localStorage.getItem("subwayDb");
    if (serialState === null) {
      return { ids: [], entities: {} };
    }
    return JSON.parse(serialState);
  } catch (err) {
    console.log(err);
    return { ids: [], entities: {} };
  }
};

export const saveSubwayDbState = (state: { id: number[] }) => {
  try {
    const serialState = JSON.stringify(state);
    localStorage.setItem("subwayDb", serialState);
    localStorage.setItem("version", "1");
  } catch (err) {
    console.log(err);
  }
};
