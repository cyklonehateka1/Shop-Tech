import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartState: JSON.parse(localStorage.getItem("clientCart")) || {
    products: [],
    total: 0,
    quantity: 0,
  },
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cartState = {
        products: action.payload.products,
        quantity: state.cartState.quantity + action.payload.quantity,
        total: state.cartState.total + action.payload.total,
      };
    },
    removeFromCart: (state, action) => {
      state.cartState = {
        products: action.payload.products,
        quantity: state.cartState.quantity - action.payload.quantity,
        total: state.cartState.total - action.payload.total,
      };
    },
  },
});
export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
