import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { AddOrder } from "services/OrderService";
import { AddProduct, GetAllProducts } from "services/ProductService";
import { Home, Login, Profile, ProfileImage, Register } from "services/UserService";

const initialState = {
  products : []
};
  
  export const addOrderAction = createAsyncThunk(
    "orders/add",
    async (data, thunkApi) => {
      try {
        const response = await AddOrder(data);
        return thunkApi.fulfillWithValue(response);
      } catch (error) {
        return thunkApi.rejectWithValue(error.response.error);
      }
    }
  );

  const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(addOrderAction.fulfilled, (state, action) => {
        });
    }
    
});

export default orderSlice.reducer;