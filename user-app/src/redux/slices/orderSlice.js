import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const placeOrder = createAsyncThunk('orders/place', async (payload, { rejectWithValue }) => {
  try {
    const res = await api.post('/orders', payload);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const fetchMyOrders = createAsyncThunk('orders/fetchMy', async (_, { rejectWithValue }) => {
  try {
    const res = await api.get('/orders/my-orders');
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

const slice = createSlice({
  name: 'orders',
  initialState: { list: [], current: null, status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (s) => { s.status = 'loading'; })
      .addCase(placeOrder.fulfilled, (s, a) => { s.status = 'succeeded'; s.current = a.payload; })
      .addCase(placeOrder.rejected, (s, a) => { s.status = 'failed'; s.error = a.payload; })

      .addCase(fetchMyOrders.pending, (s) => { s.status = 'loading'; })
      .addCase(fetchMyOrders.fulfilled, (s, a) => { s.status = 'succeeded'; s.list = a.payload; })
      .addCase(fetchMyOrders.rejected, (s, a) => { s.status = 'failed'; s.error = a.payload; });
  }
});

export default slice.reducer;
