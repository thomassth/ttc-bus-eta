import { FavouriteEtaRedux } from "../../models/etaObjects";

export const loadFavouriteEtasState = () => {
  try {
    const serialState = localStorage.getItem("favouriteEtas");
    console.log("getfavouriteEtas");
    console.log(serialState);
    if (serialState === null) {
      return { ids: [], entities: {} };
    }
    return JSON.parse(serialState);
  } catch (err) {
    console.log(err);
    return { ids: [], entities: {} };
  }
};

export const saveFavouriteEtasState = (state: FavouriteEtaRedux) => {
  try {
    const serialState = JSON.stringify(state);
    // localStorage.removeItem("favouriteEtas");
    localStorage.setItem("favouriteEtas", serialState);
    localStorage.setItem("version", "1");
  } catch (err) {
    console.log(err);
  }
};
