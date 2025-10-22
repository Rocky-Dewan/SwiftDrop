import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [] // { product: id, name, price, qty }
};

const slice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const { product, qty = 1 } = action.payload; // product is object
      const idx = state.items.findIndex(i => i.product === product._id);
      if (idx >= 0) {
        state.items[idx].qty += qty;
      } else {
        state.items.push({ product: product._id, name: product.name, price: product.price, qty });
      }
    },
    removeFromCart(state, action) {
      const id = action.payload;
      state.items = state.items.filter(i => i.product !== id);
    },
    updateQty(state, action) {
      const { productId, qty } = action.payload;
      const idx = state.items.findIndex(i => i.product === productId);
      if (idx >= 0) state.items[idx].qty = qty;
    },
    clearCart(state) { state.items = []; }
  }
});

export const { addToCart, removeFromCart, updateQty, clearCart } = slice.actions;
export default slice.reducer;
