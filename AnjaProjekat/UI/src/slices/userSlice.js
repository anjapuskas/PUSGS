import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Home, Login, Register } from "services/UserService";

const initialState = {
    token: localStorage.getItem("token"),
    loggedIn: localStorage.getItem("token") == null
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

  export const registerAction = createAsyncThunk(
    "user/register",
    async (data, thunkApi) => {
      try {
      
        const response = await Register(data);
        return thunkApi.fulfillWithValue(response);
      } catch (error) {
        return thunkApi.rejectWithValue(error.response.error);
      }
    }
  );

  const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {},
    },
    extraReducers: (builder) => {
        builder.addCase(loginAction.fulfilled, (state, action) => {
          const token = action.payload.token;
          state.token = token;
          state.loggedIn = true;
    
          localStorage.setItem("token", token);
        });
        builder.addCase(registerAction.fulfilled, (state, action) => {
          
        });
    }
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;