import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface AdminState {
  admin: any;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AdminState = {
  admin: null,
  token: null,
  loading: false,
  error: null,
};

export const signupAdmin = createAsyncThunk(
  'admin/signup',
  async (formData: any, thunkAPI) => {
    try {
      const res = await axios.post('/api/admin/signup', formData);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || 'Signup failed');
    }
  }
);

export const loginAdmin = createAsyncThunk(
  'admin/login',
  async (credentials: { email: string; password: string }, thunkAPI) => {
    try {
      const res = await axios.post('/api/admin/login', credentials);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || 'Login failed');
    }
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    logoutAdmin: (state) => {
      state.admin = null;
      state.token = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(signupAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(signupAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload.admin;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logoutAdmin } = adminSlice.actions;
export default adminSlice.reducer;
