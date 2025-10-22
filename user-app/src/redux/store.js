import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import productReducer from './slices/productSlice';
import cartReducer from './slices/cartSlice';
import orderReducer from './slices/orderSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
    cart: cartReducer,
    orders: orderReducer
  }
});

export default store;
