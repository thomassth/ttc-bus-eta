import { configureStore } from "@reduxjs/toolkit";
import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";

import { stopBookmarksSlice } from "./bookmarks/slice.js";
import { settingsSlice } from "./settings/slice.js";
import { subwayDbSlice } from "./suwbayDb/slice.js";

export const store = configureStore({
  reducer: {
    stopBookmarks: stopBookmarksSlice.reducer,
    settings: settingsSlice.reducer,
    subwayDb: subwayDbSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
