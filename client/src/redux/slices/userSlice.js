import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  isLoading: false,
  error: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state, action) => {
      state.error = true;
      state.isLoading = false;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isLoading = false;
      state.error = false;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logOut } =
  userSlice.actions;

export default userSlice.reducer;
