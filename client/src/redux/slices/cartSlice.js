import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  quantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addTocart: (state, action) => {
      const itemIndex = state.products.findIndex(
        (item) => item.product === action.payload.product
      );
      if (itemIndex === -1) {
        state.products.push(action.payload);
        state.quantity += action.payload.quantity;
        state.total += action.payload.price * action.payload.quantity;
      } else {
        state.products[itemIndex].quantity += action.payload.quantity;
        state.quantity += action.payload.quantity;
        state.total += action.payload.price * action.payload.quantity;
      }
    },
    // removeFromCart: (state, action) => {},
  },
});

export const { addTocart } = cartSlice.actions;
export default cartSlice.reducer;
