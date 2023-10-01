import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  isLoading: false,
  error: null,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    start: (state, action) => {
      state.isLoading = true;
    },
    getOrdersSuccess: (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
    },
    failure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});
export const { getOrdersSuccess, start, failure } = orderSlice.actions;

export default orderSlice.reducer;
