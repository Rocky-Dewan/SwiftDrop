import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAssignedOrders } from "../../services/deliveryService";

export const fetchOrders = createAsyncThunk("order/fetch", async () => {
  const data = await getAssignedOrders();
  return data;
});

const orderSlice = createSlice({
  name: "order",
  initialState: { orders: [], loading: false },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.loading = false;
      });
  }
});

export default orderSlice.reducer;
