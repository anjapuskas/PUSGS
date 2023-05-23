import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Home, Login } from "services/UserService";

const initialState = {
    token: localStorage.getItem("token")
  };
  
  export const loginAction = createAsyncThunk(
    "user/login",
    async (data, thunkApi) => {
      try {
      
        const response = await Login(data);
        return thunkApi.fulfillWithValue(response);
      } catch (error) {
        return thunkApi.rejectWithValue(error.response.error);
      }
    }
  );

  export const homeAction = createAsyncThunk(
    "user/home",
    async (data, thunkApi) => {
      try {
      
        const response = await Home();
        return thunkApi.fulfillWithValue(response);
      } catch (error) {
        return thunkApi.rejectWithValue(error.response.error);
      }
    }
  );

  const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {},
    },
    extraReducers: (builder) => {
        builder.addCase(loginAction.fulfilled, (state, action) => {
          const token = action.payload.token;
          state.token = token;
    
          localStorage.setItem("token", token);
        });
    }
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;