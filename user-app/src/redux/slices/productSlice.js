import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchProducts = createAsyncThunk('products/fetch', async ({ page = 1, q = '' } = {}, { rejectWithValue }) => {
  try {
    const res = await api.get('/products', { params: { page, q } });
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

const slice = createSlice({
  name: 'products',
  initialState: { list: [], total: 0, page: 1, status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (s) => { s.status = 'loading'; })
      .addCase(fetchProducts.fulfilled, (s, a) => {
        s.status = 'succeeded';
        s.list = a.payload.products;
        s.total = a.payload.total;
        s.page = a.payload.page;
      })
      .addCase(fetchProducts.rejected, (s, a) => { s.status = 'failed'; s.error = a.payload; });
  }
});

export default slice.reducer;
