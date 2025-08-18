import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createOrder,
  getOrderById,
  getOrderForAdmin,
  getOrdersAmount,
  updateOrderStatus,
} from "../api";
import { pendingCase, rejectedCase } from "./function";
import { getAccountOrders } from "../api/index";

export const getOrdersAmountThunk = createAsyncThunk(
  "orders/getOrdersAmountThunk",
  async (_, thunkAPI) => {
    try {
      const response = await getOrdersAmount();
      return response.data.data;
    } catch (error) {
      const msg = error.response.data.errors[0];

      return thunkAPI.rejectWithValue(msg);
    }
  }
);
export const getOrderByIdThunk = createAsyncThunk(
  "orders/getOrderByIdThunk",
  async (id, thunkAPI) => {
    try {
      const response = await getOrderById(id);
      return response.data.data;
    } catch (error) {
      const msg = error.response.data.errors[0];

      return thunkAPI.rejectWithValue(msg);
    }
  }
);

export const getAccountOrdersThunk = createAsyncThunk(
  "orders/getAccountOrdersThunk",
  async (_, thunkAPI) => {
    try {
      const response = await getAccountOrders();
      return response.data.data;
    } catch (error) {
      const msg = error.response.data.errors[0];

      return thunkAPI.rejectWithValue(msg);
    }
  }
);
export const getOrderForAdminThunk = createAsyncThunk(
  "orders/getOrderForAdminThunk",
  async (options, thunkAPI) => {
    try {
      const response = await getOrderForAdmin(options);
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
const initialState = {
  orders: [],
  totalOrders: 0,
  ordersAccount: [],
  selectedOrder: null,
  error: null,
  isLoading: false,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    resetOrders: () => initialState,
  },
  extraReducers: (builder) => {
       builder.addCase(getOrdersAmountThunk.pending, pendingCase);
    builder.addCase(getOrdersAmountThunk.rejected, rejectedCase);
    builder.addCase(getOrdersAmountThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.totalOrders = action.payload;
    });

    builder.addCase(getOrderByIdThunk.pending, pendingCase);
    builder.addCase(getOrderByIdThunk.rejected, rejectedCase);
    builder.addCase(getOrderByIdThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.selectedOrder = action.payload;
    });

    builder.addCase(createOrderThunk.pending, pendingCase);
    builder.addCase(createOrderThunk.rejected, rejectedCase);
    builder.addCase(createOrderThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.orders.push(action.payload);
    });
    builder.addCase(updateOrderStatusThunk.pending, pendingCase);
    builder.addCase(updateOrderStatusThunk.rejected, rejectedCase);
    builder.addCase(updateOrderStatusThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      const index = state.orders.findIndex(
        (order) => order._id === action.payload._id
      );
      if (index !== -1) {
        state.orders[index] = action.payload;
      }
    });
    builder.addCase(getOrderForAdminThunk.pending, pendingCase);
    builder.addCase(getOrderForAdminThunk.rejected, rejectedCase);
    builder.addCase(getOrderForAdminThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.orders = action.payload;
    });

    builder.addCase(getAccountOrdersThunk.pending, pendingCase);
    builder.addCase(getAccountOrdersThunk.rejected, rejectedCase);
    builder.addCase(getAccountOrdersThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.ordersAccount = action.payload;
    });
  },
});
export const { resetOrders } = orderSlice.actions;
export default orderSlice.reducer;
