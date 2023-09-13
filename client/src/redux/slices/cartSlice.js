import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: JSON.parse(localStorage.getItem("clientCart")),
  isLoading: false,
  failure: false,
  success: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addTocart: (state, action) => {
      const itemIndex = state.cart.products.findIndex(
        (item) => item.product._id === action.payload.product._id
      );
      if (itemIndex === -1) {
        state.cart.products.push(action.payload);
        state.cart.quantity += action.payload.quantity;
        state.cart.total +=
          action.payload.product.price * action.payload.quantity;
      } else {
        if (state.cart.products[itemIndex].quantity > action.payload.quantity) {
          const addedProd =
            state.cart.products[itemIndex].quantity - action.payload.quantity;
          state.cart.total -= addedProd * action.payload.product.price;
          state.cart.quantity -= addedProd;
          state.cart.products[itemIndex].quantity = action.payload.quantity;
        } else if (
          state.cart.products[itemIndex].quantity < action.payload.quantity
        ) {
          const addedProd =
            action.payload.quantity - state.cart.products[itemIndex].quantity;
          state.cart.total += addedProd * action.payload.price;
          state.cart.quantity += addedProd;
          state.cart.products[itemIndex].quantity = action.payload.quantity;
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
