import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  productList: [],
};

export const addNewProduct = createAsyncThunk(
  "/products/add",
  async (formData) => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    const result = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/admin/products/add`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return result.data;
  }
);

export const fetchAllProducts = createAsyncThunk("/products/all", async () => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const result = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/admin/products/get`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return result.data;
});

export const editProduct = createAsyncThunk(
  "/products/edit",
  async ({ id, formData }) => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    const result = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/admin/products/edit/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return result.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "/products/delete",
  async (id) => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    const result = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/admin/products/delete/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
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
