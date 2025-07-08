import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface IdentificationResult {
  result: any; // Use real type if known
}

interface IdentificationState {
  result: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: IdentificationState = {
  result: null,
  loading: false,
  error: null,
};

export const identifyPlant = createAsyncThunk(
  'plant/identifyPlant',
  async (formData: FormData, thunkAPI) => {
    try {
      const res = await fetch('http://localhost:3000/api/plant', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Failed to identify plant');

      return await res.json();
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message || 'Identification error');
    }
  }
);

const plantSlice = createSlice({
  name: 'plant',
  initialState,
  reducers: {
    clearResult(state) {
      state.result = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(identifyPlant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(identifyPlant.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.result = action.payload;
      })
      .addCase(identifyPlant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearResult } = plantSlice.actions;
export default plantSlice.reducer;
