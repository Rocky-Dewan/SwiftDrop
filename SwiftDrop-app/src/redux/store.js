import { configureStore } from "@reduxjs/toolkit";
import deliveryReducer from "./slices/deliverySlice";
import orderReducer from "./slices/orderSlice";

export default configureStore({
  reducer: {
    delivery: deliveryReducer,
    order: orderReducer
  }
});
