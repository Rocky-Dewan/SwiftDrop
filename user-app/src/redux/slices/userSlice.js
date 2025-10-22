<<<<<<< Updated upstream
=======
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser, registerUser, fetchProfile } from '../../services/userService';

export const login = createAsyncThunk('user/login', async ({ phone, password }, { rejectWithValue }) => {
  try {
    const data = await loginUser(phone, password);
    await AsyncStorage.setItem('token', data.token);
    await AsyncStorage.setItem('user', JSON.stringify(data.user));
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const register = createAsyncThunk('user/register', async (payload, { rejectWithValue }) => {
  try {
    const data = await registerUser(payload);
    await AsyncStorage.setItem('token', data.token);
    await AsyncStorage.setItem('user', JSON.stringify(data.user));
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const loadProfile = createAsyncThunk('user/loadProfile', async (_, { rejectWithValue }) => {
  try {
    const data = await fetchProfile();
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

const initialState = {
  user: null,
  token: null,
  status: 'idle',
  error: null
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      AsyncStorage.removeItem('token');
      AsyncStorage.removeItem('user');
    },
    setUserFromStorage(state, action) {
      state.user = action.payload.user || null;
      state.token = action.payload.token || null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (s) => { s.status = 'loading'; s.error = null; })
      .addCase(login.fulfilled, (s, a) => { s.status = 'succeeded'; s.user = a.payload.user; s.token = a.payload.token; })
      .addCase(login.rejected, (s, a) => { s.status = 'failed'; s.error = a.payload; })

      .addCase(register.pending, (s) => { s.status = 'loading'; s.error = null; })
      .addCase(register.fulfilled, (s, a) => { s.status = 'succeeded'; s.user = a.payload.user; s.token = a.payload.token; })
      .addCase(register.rejected, (s, a) => { s.status = 'failed'; s.error = a.payload; })

      .addCase(loadProfile.pending, (s) => { s.status = 'loading'; })
      .addCase(loadProfile.fulfilled, (s, a) => { s.status = 'succeeded'; s.user = a.payload; })
      .addCase(loadProfile.rejected, (s, a) => { s.status = 'failed'; s.error = a.payload; });
  }
});

export const { logout, setUserFromStorage } = slice.actions;
export default slice.reducer;
>>>>>>> Stashed changes
