// src/store/userSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface UserState {
  user: any;
  token: string | null;
  loading: boolean;
  error: string | null;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  isLoggedIn: false,
};

export const signupUser = createAsyncThunk(
  'user/signup',
  async (formData: any, thunkAPI) => {
    try {
      const res = await axios.post('/api/auth/signup', formData);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || 'Signup failed');
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (credentials: { email: string; password: string }, thunkAPI) => {
    try {
      const res = await axios.post('/api/auth/login', credentials);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || 'Login failed');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user || {};
        state.token = action.payload.token;
        state.error = null;
        state.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isLoggedIn = false;
      });
  },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;