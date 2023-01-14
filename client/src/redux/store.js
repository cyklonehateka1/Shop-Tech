import { configureStore } from "@reduxjs/toolkit";

import userReducer, { currentUserSlice } from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
