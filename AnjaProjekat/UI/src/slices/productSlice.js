import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { AddProduct, GetAllProducts } from "services/ProductService";
import { Home, Login, Profile, ProfileImage, Register } from "services/UserService";

const initialState = {
  products : []
};
  
  export const addProductAction = createAsyncThunk(
    "products/add",
    async (data, thunkApi) => {
      try {
        const response = await AddProduct(data);
        return thunkApi.fulfillWithValue(response);
      } catch (error) {
        return thunkApi.rejectWithValue(error.response.error);
      }
    }
  );

  export const getAllProductsAction = createAsyncThunk(
    "products",
    async (data, thunkApi) => {
      try {
        const response = await GetAllProducts();
        return thunkApi.fulfillWithValue(response);
      } catch (error) {
        return thunkApi.rejectWithValue(error.response.error);
      }
    }
  );

  const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(addProductAction.fulfilled, (state, action) => {
        });
        builder.addCase(getAllProductsAction.fulfilled, (state, action) => {
          state.products = action.payload;
        });
    }
    
});

export default productSlice.reducer;