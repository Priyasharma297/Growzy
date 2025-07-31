import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch AI care tips
export const fetchPlantCareTips = createAsyncThunk(
  "plantCare/fetchPlantCareTips",
  async (plantName, { rejectWithValue }) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/plant-care`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plantName }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");

      return { plantName, careTips: data.careTips };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const plantCareSlice = createSlice({
  name: "plantCare",
  initialState: {
    loading: false,
    careTips: "",
    error: null,
    plantName: "",
  },
  reducers: {
    resetPlantCare: (state) => {
      state.loading = false;
      state.careTips = "";
      state.error = null;
      state.plantName = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlantCareTips.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.careTips = "";
        state.plantName = action.meta.arg;
      })
      .addCase(fetchPlantCareTips.fulfilled, (state, action) => {
        state.loading = false;
        state.careTips = action.payload.careTips;
        state.error = null;
      })
      .addCase(fetchPlantCareTips.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.careTips = "";
      });
  },
});

export const { resetPlantCare } = plantCareSlice.actions;
export default plantCareSlice.reducer;
