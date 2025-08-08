import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createOrder, getOrderForAdmin, updateOrderStatus } from "../api";
import { pendingCase, rejectedCase } from "./function";

export const getOrderForAdminThunk = createAsyncThunk(
  "orders/getOrderForAdminThunk",
  async (_, thunkAPI) => {
    try {
      const response = await getOrderForAdmin();
      return response.data.data;
    } catch (error) {
      const msg = error.response.data.errors[0];

      return thunkAPI.rejectWithValue(msg);
    }
  }
);
export const createOrderThunk = createAsyncThunk(
  "orders/createOrderThunk",
  async (values, thunkAPI) => {
    try {
      const response = await createOrder(values);
      return response.data.data;
    } catch (error) {
      const msg = error.response.data.errors[0];

      return thunkAPI.rejectWithValue(msg);
    }
  }
);
export const updateOrderStatusThunk = createAsyncThunk(
  "orders/updateOrderStatusThunk",
  async ({ id, status }, thunkAPI) => {
    try {
      const response = await updateOrderStatus(id, status);
      return response.data.data;
    } catch (error) {
      const msg = error.response.data.errors[0];
      throw thunkAPI.rejectWithValue(msg);
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    error: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createOrderThunk.pending, pendingCase);
    builder.addCase(createOrderThunk.rejected, rejectedCase);
    builder.addCase(createOrderThunk.fulfilled, (state, action) => {
      (state.isLoading = false), (state.error = null);
      state.orders.push(action.payload);
    });
    builder.addCase(updateOrderStatusThunk.pending, pendingCase);
    builder.addCase(updateOrderStatusThunk.rejected, rejectedCase);
    builder.addCase(updateOrderStatusThunk.fulfilled, (state, action) => {
      (state.isLoading = false), (state.error = null);
      const index = state.orders.findIndex(
        (order) => order._id === action.payload._id
      );
      if (index !== -1) {
        state.orders[index] = action.payload;
      }
      builder.addCase(getOrderForAdminThunk.pending, pendingCase);
      builder.addCase(getOrderForAdminThunk.rejected, rejectedCase);
      builder.addCase(getOrderForAdminThunk.fulfilled, (state, action) => {
        (state.isLoading = false), (state.error = null);
        state.orders = action.payload;
      });
    });
  },
});
export default orderSlice.reducer;
