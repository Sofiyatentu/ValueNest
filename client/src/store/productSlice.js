import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  productList: [],
};

export const addNewProduct = createAsyncThunk(
  "/products/add",
  async (formData) => {
    const result = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/admin/products/add`,
      formData,
      { headers: { "Content-Type": "application/json" } }
    );
    return result.data;
  }
);

export const fetchAllProducts = createAsyncThunk("/products/all", async () => {
  const result = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/admin/products/get`
  );
  return result.data;
});

export const editProduct = createAsyncThunk(
  "/products/edit",
  async ({ id, formData }) => {
    const result = await axios.put(
      `http://localhost:5000/api/admin/products/edit/${id}`,
      formData,
      { headers: { "Content-Type": "application/json" } }
    );
    return result.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "/products/delete",
  async (id) => {
    const result = await axios.delete(
      `http://localhost:5000/api/admin/products/delete/${id}`
    );
    return result.data;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload?.data || [];
      })
      .addCase(fetchAllProducts.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default productSlice.reducer;
