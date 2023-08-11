import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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
        return thunkApi.rejectWithValue(error.message);
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
        return thunkApi.rejectWithValue(error.message);
      }
    }
  );

  const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
      amountProductChange: (state, action) => {
        const item = state.products.find((item) => item.id == action.payload.id)
        if(item) {
            item.amount--;
        }
      },
    },
    extraReducers: (builder) => {
        builder.addCase(addProductAction.fulfilled, (state, action) => {
        });
        builder.addCase(addProductAction.rejected, (state, action) => {
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
        builder.addCase(getAllProductsAction.fulfilled, (state, action) => {
          state.products = action.payload;
        });
    }
    
});
export const { amountProductChange } = productSlice.actions;

export default productSlice.reducer;