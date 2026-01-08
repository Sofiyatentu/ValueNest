import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = {
  isLoading: false,
  productList: [],
  productDetails: null,
};

export const getAllFilteredProducts = createAsyncThunk(
  '/products/get',
  async ({ filterParams, sortParams }) => {
    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams,
    });
    const result = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/products/get?${query}`,
    );
    return result.data;
  },
);

export const getProductDetails = createAsyncThunk('/products/get/id', async (id) => {
  const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/products/get/${id}`);
  return result.data;
});

const ShoppingProductSlice = createSlice({
  name: 'shoppingProducts',
  initialState,
  reducers: {
    clearProductDetails(state) {
      state.productDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllFilteredProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllFilteredProducts.fulfilled, (state, action) => {
        console.log(action.payload);
        ((state.isLoading = false), (state.productList = action.payload.data));
      })
      .addCase(getAllFilteredProducts.rejected, (state) => {
        ((state.isLoading = false), (state.productList = []));
      })
      .addCase(getProductDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        ((state.isLoading = false), (state.productDetails = action.payload.data));
      })
      .addCase(getProductDetails.rejected, (state) => {
        ((state.isLoading = false), (state.productDetails = null));
      });
  },
});

export const { clearProductDetails } = ShoppingProductSlice.actions;
export default ShoppingProductSlice.reducer;
