import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { AddProduct } from "services/ProductService";
import { Home, Login, Profile, ProfileImage, Register } from "services/UserService";

const initialState = {
  token: localStorage.getItem("token"),
  loggedIn: localStorage.getItem("token") != null,
  user: localStorage.getItem("user") != null ? JSON.parse(localStorage.getItem("user")) : null
};
  
  export const addProductAction = createAsyncThunk(
    "product/add",
    async (data, thunkApi) => {
      try {
        const response = await AddProduct(data);
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
    }
    
});

export default productSlice.reducer;