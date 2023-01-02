import { createSlice } from "@reduxjs/toolkit";

const emptyBookmark = { stops: { ids: [], entities: {} } };

export const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState: {
    value: emptyBookmark,
  },
  reducers: {
    changeValue: (state, input) => {
      state.value = input.payload;
    },
    clearBookmark: (state) => {
      state.value = emptyBookmark;
    },
  },
});

export const { changeValue, clearBookmark } = bookmarkSlice.actions;

export default bookmarkSlice.reducer;
