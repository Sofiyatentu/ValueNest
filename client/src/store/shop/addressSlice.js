import axios from 'axios';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  addressList: [],
};

export const addAddress = createAsyncThunk('/add/address', async (formData) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/shop/address/add`,
    formData,
  );
  return response.data;
});

export const fetchAllAddress = createAsyncThunk('/getAll/address', async (userId) => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/shop/address/get/${userId}`,
  );
  return response.data;
});

export const editAddress = createAsyncThunk(
  '/edit/address',
  async ({ formData, userId, addressId }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/shop/address/edit/${userId}/${addressId}`,
      formData,
    );
    return response.data;
  },
);

export const deleteAddress = createAsyncThunk('/delete/address', async ({ userId, addressId }) => {
  const response = await axios.delete(
    `${import.meta.env.VITE_API_URL}/api/shop/address/delete/${userId}/${addressId}`,
  );
  return response.data;
});

const AddressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addAddress.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addAddress.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchAllAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(fetchAllAddress.rejected, (state) => {
        state.isLoading = false;
        state.addressList = [];
      });
  },
});

export default AddressSlice.reducer;
