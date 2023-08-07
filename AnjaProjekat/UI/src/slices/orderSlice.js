import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AddOrder, CancelOrder, GetAllOrders } from "services/OrderService";


const initialState = {
  orders : []
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

  export const getAllOrdersAction = createAsyncThunk(
    "orders",
    async (data, thunkApi) => {
      try {
        const response = await GetAllOrders(data);
        return thunkApi.fulfillWithValue(response);
      } catch (error) {
        return thunkApi.rejectWithValue(error.response.error);
      }
    }
  );


  export const cancelOrder = createAsyncThunk(
    "orders/cancel",
    async (data, thunkApi) => {
      try {
        const response = await CancelOrder(data);
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
        builder.addCase(getAllOrdersAction.fulfilled, (state, action) => {
          state.orders = action.payload;
        });
        builder.addCase(cancelOrder.fulfilled, (state, action) => {
        });
    }
    
});

export default orderSlice.reducer;