import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  featureImagesList: [],
};

export const getFeatureImages = createAsyncThunk("/get/images", async () => {
  const result = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/common/feature/get`
  );
  return result.data;
});

export const addFeatureImage = createAsyncThunk("/add", async (image) => {
  const result = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/common/feature/add`,
    { image }
  );
  return result.data;
});

const featureSlice = createSlice({
  name: "feature",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeatureImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeatureImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featureImagesList = action.payload.data;
      })
      .addCase(getFeatureImages.rejected, (state) => {
        state.isLoading = false;
        state.featureImagesList = [];
      });
  },
});

export default featureSlice.reducer;
