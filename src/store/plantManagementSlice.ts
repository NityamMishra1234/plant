import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Plant {
  _id?: string;
  name: string;
  type: string;
  description: string;
  price: number;
  imageUrl: string;
}

interface PlantState {
  plants: Plant[];
  loading: boolean;
  error: string | null;
}

const initialState: PlantState = {
  plants: [],
  loading: false,
  error: null,
};

export const fetchPlants = createAsyncThunk('plants/fetch', async (_, thunkAPI) => {
  try {
    const res = await axios.get('http://localhost:3000/api/addplants');
    return res.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue('Failed to fetch plants');
  }
});

export const addPlant = createAsyncThunk(
  'plants/add',
  async ({ formData, token }: { formData: FormData; token: string }, thunkAPI) => {
    try {
      const res = await axios.post('http://localhost:3000/api/addplants', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue('Failed to add plant');
    }
  }
);

export const deletePlant = createAsyncThunk(
  'plants/delete',
  async ({ id, token }: { id: string; token: string }, thunkAPI) => {
    try {
      const res = await axios.delete(`http://localhost:3000/api/addplants/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return { id };
    } catch (err: any) {
      return thunkAPI.rejectWithValue('Failed to delete plant');
    }
  }
);

const plantSlice = createSlice({
  name: 'plantManagement',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlants.fulfilled, (state, action) => {
        state.loading = false;
        state.plants = action.payload;
      })
      .addCase(fetchPlants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(addPlant.pending, (state) => {
        state.loading = true;
      })
      .addCase(addPlant.fulfilled, (state, action) => {
        state.loading = false;
        // no update as it fetches separately
      })
      .addCase(addPlant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(deletePlant.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePlant.fulfilled, (state, action) => {
        state.loading = false;
        state.plants = state.plants.filter(plant => plant._id !== action.payload.id);
      })
      .addCase(deletePlant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default plantSlice.reducer;
