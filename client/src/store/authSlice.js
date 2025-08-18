import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerUser, loginUser, getAccount, updateUser } from "../api";
import { pendingCase, rejectedCase } from "./function";

export const updateUserThunk=createAsyncThunk(
  'auth/updateUserThunk',
  async({id,values},thunkAPI)=>{
    try {
      const response = await updateUser(id,values);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)
export const registerUserThunk = createAsyncThunk(
  "auth/registerUser",
  async (values, thunkAPI) => {
    try {
      const response = await registerUser(values);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const loginUserThunk = createAsyncThunk(
  "auth/loginUser",
  async (values, thunkAPI) => {
    try {
      const response = await loginUser(values);
      localStorage.setItem("token", response.data.data.token);
      return response.data.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const getAccountThunk = createAsyncThunk(
  "auth/getAccount",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return thunkAPI.rejectWithValue("No token found, please login first.");
      }
      const response = await getAccount();
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const logoutUserThunk = createAsyncThunk("auth/logoutUser", async () => {
  localStorage.removeItem("token");
});


const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateUserThunk.pending, pendingCase);
    builder.addCase(updateUserThunk.rejected, rejectedCase);
    builder.addCase(updateUserThunk.fulfilled,(state,action)=>{
        state.user=null;
      state.error=null
      state.user=action.payload
    });
    builder.addCase(logoutUserThunk.pending, pendingCase);
      builder.addCase(loginUserThunk.rejected, rejectedCase);
    builder.addCase(logoutUserThunk.fulfilled, (state,action)=>{
      state.user=null;
      state.error=null
      state.user=action.payload
    });
    builder.addCase(getAccountThunk.rejected, rejectedCase);
      builder.addCase(getAccountThunk.pending, pendingCase);
   builder.addCase(getAccountThunk.fulfilled, (state, action) => {
     state.user = action.payload;
     state.error = null;
     state.user=action.payload;
   });
  },
});
export default authSlice.reducer;
