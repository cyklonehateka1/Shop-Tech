import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  quantity: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addTocart: (state, action) => {
      const itemIndex = state.products.findIndex(
        (item) => item.product._id === action.payload.product._id
      );
      if (itemIndex === -1) {
        state.products.push(action.payload);
        state.quantity += action.payload.quantity;
        state.total += action.payload.product.price * action.payload.quantity;
      } else {
        if (state.products[itemIndex].quantity > action.payload.quantity) {
          const addedProd =
            state.products[itemIndex].quantity - action.payload.quantity;
          state.total -= addedProd * action.payload.product.price;
          state.quantity -= addedProd;
          state.products[itemIndex].quantity = action.payload.quantity;
        } else if (
          state.products[itemIndex].quantity < action.payload.quantity
        ) {
          const addedProd =
            action.payload.quantity - state.products[itemIndex].quantity;
          state.total += addedProd * action.payload.price;
          state.quantity += addedProd;
          state.products[itemIndex].quantity = action.payload.quantity;
        }
      }
    },

    removeFromCart: (state, action) => {
      state.products = state.products.filter((item) => {
        return item.product._id !== action.payload.product._id;
      });
      state.total -= action.payload.product.price * action.payload.quantity;
      state.quantity -= action.payload.quantity;
    },
  },
});

export const { addTocart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
