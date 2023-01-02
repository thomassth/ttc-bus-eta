import { configureStore } from "@reduxjs/toolkit";
import bookmarkReducer from "../features/bookmarks/bookmarkSlice";

export default configureStore({
  reducer: {
    bookmark: bookmarkReducer,
  },
});
