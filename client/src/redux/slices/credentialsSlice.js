import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: null,
  email: null,
  image: null,
};

export const credentialsSlice = createSlice({
  name: "credentials",
  initialState,
  reducers: {
    getCredentials: (state, action) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.image = action.payload.image;
    },
  },
});

export const { getCredentials } = credentialsSlice.actions;

export default credentialsSlice.reducer;
