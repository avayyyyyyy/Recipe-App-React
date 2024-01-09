import { createSlice } from "@reduxjs/toolkit";

const isLoggedInSlice = createSlice({
  name: "isLoggedIn",
  initialState: {
    value: false,
  },
  reducers: {
    toggleLoggedIn(state) {
      state.value = !state.value;
    },
  },
});

export const { toggleLoggedIn } = isLoggedInSlice.actions;
export default isLoggedInSlice.reducer;
