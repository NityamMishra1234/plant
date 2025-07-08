import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface PlantState {
  loading: boolean;
  result: any;
  error: string | null;
}

const initialState: PlantState = {
  loading: false,
  result: null,
  error: null,
};

export const identifyPlant = createAsyncThunk(
  'plant/identifyPlant',
  async (formData: FormData) => {
    const response = await fetch('http://localhost:3000/api/plant', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Plant identification failed');
    }

    return await response.json();
  }
);

const plantSlice = createSlice({
  name: 'plant',
  initialState,
  reducers: {
    clearResult(state) {
      state.result = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(identifyPlant.pending, (state) => {
        state.loading = true;
        state.result = null;
        state.error = null;
      })
      .addCase(identifyPlant.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.result = action.payload;
      })
      .addCase(identifyPlant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export const { clearResult } = plantSlice.actions;
export default plantSlice.reducer;
