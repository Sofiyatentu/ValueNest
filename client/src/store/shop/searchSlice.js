import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  searchResults: [],
};

export const getSearchProducts = createAsyncThunk(
  "/get/:keyword",
  async (keyword) => {
    const result = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/search/get/${keyword}`
    );
    return result.data;
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    resetSearchResults: (state) => {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSearchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSearchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResults = action.payload.data;
      })
      .addCase(getSearchProducts.rejected, (state) => {
        state.isLoading = false;
        state.searchResults = [];
      });
  },
});

export const { resetSearchResults } = searchSlice.actions;
export default searchSlice.reducer;
