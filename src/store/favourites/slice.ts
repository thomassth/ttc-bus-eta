import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { FavouriteEta } from "../../models/favouriteEta";
import { loadFavouriteEtasState } from "./state";

const persistedState = loadFavouriteEtasState();

const favouriteEtasAdapter = createEntityAdapter({
  selectId: (favouriteEta: FavouriteEta) => favouriteEta.id,
});
const initialState =
  Object.keys(persistedState).length === 0
    ? { ids: [], entities: {} }
    : persistedState;

export const favouriteEtasSlice = createSlice({
  name: "favouriteEtas",
  initialState,
  reducers: {
    addFavouriteadEta: favouriteEtasAdapter.addOne,
    removeFavouriteadEta: favouriteEtasAdapter.removeOne,

    getFavouriteadEta: favouriteEtasAdapter.selectId,
  },
});

export const { addFavouriteadEta, removeFavouriteadEta } =
  favouriteEtasSlice.actions;
