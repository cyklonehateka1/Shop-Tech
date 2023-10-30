import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slices/userSlice";
import cartReducer from "./slices/cartSlice";
import orderReducer from "./slices/orderSlice";
import credentialsReducer from "./slices/credentialsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    orders: orderReducer,
    credentials: credentialsReducer,
  },
});
