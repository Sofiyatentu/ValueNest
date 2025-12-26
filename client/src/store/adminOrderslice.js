import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  orderList: [],
  orderDetails: null,
};

export const getAllOrdersAllUser = createAsyncThunk(
  "/getAllAdmin",
  async () => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/orders/get-all`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  }
);

export const getOrderDetailsForAdmin = createAsyncThunk(
  "/admin/details/:id",
  async (id) => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/orders/details/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  }
);

export const updateOrderStatus = createAsyncThunk(
  "/update/:id",
  async ({ id, orderStatus }) => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/admin/orders/update/${id}`,
      { orderStatus },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  }
);

const adminOrderSlice = createSlice({
  name: "adminOrder",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrdersAllUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersAllUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrdersAllUser.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(getOrderDetailsForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetailsForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetailsForAdmin.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  },
});
export const { resetOrderDetails } = adminOrderSlice.actions;
export default adminOrderSlice.reducer;
