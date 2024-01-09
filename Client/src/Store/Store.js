import { configureStore } from "@reduxjs/toolkit";
import isLoggedInSlice from "./isLoggedInSlice";

const Store = configureStore({
  reducer: {
    isLoggedIn: isLoggedInSlice,
  },
});

export default Store;
