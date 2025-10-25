import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginAgentAPI } from "../../services/deliveryService";

export const loginDeliveryAgent = createAsyncThunk("delivery/login", async (credentials) => {
  const res = await loginAgentAPI(credentials);
  return res;
});

const deliverySlice = createSlice({
  name: "delivery",
  initialState: { agent: null, token: null, loading: false },
  reducers: {
    logout: (state) => {
      state.agent = null;
      state.token = null;
      localStorage.removeItem("deliveryToken");
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginDeliveryAgent.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginDeliveryAgent.fulfilled, (state, action) => {
        state.loading = false;
        state.agent = action.payload.agent;
        state.token = action.payload.token;
      })
      .addCase(loginDeliveryAgent.rejected, (state) => {
        state.loading = false;
      });
  }
});

export const { logout } = deliverySlice.actions;
export default deliverySlice.reducer;
