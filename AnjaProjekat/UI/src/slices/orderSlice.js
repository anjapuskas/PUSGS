import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { AddOrder, CancelOrder, GetAdminOrders, GetAllOrders, GetNewOrders } from "services/OrderService";


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
        return thunkApi.rejectWithValue(error.message);
      }
    }
  );

  export const getAllOrdersAction = createAsyncThunk(
    "orders/all",
    async (data, thunkApi) => {
      try {
        const response = await GetAllOrders(data);
        return thunkApi.fulfillWithValue(response);
      } catch (error) {
        return thunkApi.rejectWithValue(error.message);
      }
    }
  );

  export const getNewOrdersAction = createAsyncThunk(
    "orders/new",
    async (data, thunkApi) => {
      try {
        const response = await GetNewOrders();
        return thunkApi.fulfillWithValue(response);
      } catch (error) {
        return thunkApi.rejectWithValue(error.message);
      }
    }
  );

  export const getAdminOrdersAction = createAsyncThunk(
    "orders/admin",
    async (data, thunkApi) => {
      try {
        const response = await GetAdminOrders();
        return thunkApi.fulfillWithValue(response);
      } catch (error) {
        return thunkApi.rejectWithValue(error.message);
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
        return thunkApi.rejectWithValue(error.message);
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
        builder.addCase(getNewOrdersAction.fulfilled, (state, action) => {
          state.orders = action.payload;
        });
        builder.addCase(getNewOrdersAction.rejected, (state, action) => {
          let error = ""; 
          if (typeof action.payload === "string") {
            error = action.payload;
          }
    
          toast.error(error, {
            position: "top-center",
            autoClose: 2500,
            closeOnClick: true,
            pauseOnHover: false,
          });
        });
        builder.addCase(getAdminOrdersAction.fulfilled, (state, action) => {
          state.orders = action.payload;
        });
    }
    
});

export default orderSlice.reducer;