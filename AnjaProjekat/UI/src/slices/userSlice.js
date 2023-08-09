import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetSellersForVerification, GoogleLogin, Home, Login, Profile, ProfileImage, Register, RejectUser, VerifyUser } from "services/UserService";

const initialState = {
  token: localStorage.getItem("token"),
  loggedIn: localStorage.getItem("token") != null,
  user: localStorage.getItem("user") != null ? JSON.parse(localStorage.getItem("user")) : null,
  sellers : []
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

  export const profileAction = createAsyncThunk(
    "user/profile",
    async (data, thunkApi) => {
      try {
      
        const response = await Profile(data);
        return thunkApi.fulfillWithValue(response);
      } catch (error) {
        return thunkApi.rejectWithValue(error.response.error);
      }
    }
  );

  export const profileImageAction = createAsyncThunk(
    "user/profile/image",
    async (id, thunkApi) => {
      try {
      
        const response = await ProfileImage(id);
        return thunkApi.fulfillWithValue(response);
      } catch (error) {
        return thunkApi.rejectWithValue(error.response.error);
      }
    }
  );

  export const getSellersForVerification = createAsyncThunk(
    "user/verify-list",
    async (data, thunkApi) => {
      try {
        const response = await GetSellersForVerification();
        return thunkApi.fulfillWithValue(response);
      } catch (error) {
        return thunkApi.rejectWithValue(error.response.error);
      }
    }
  );

  export const verifySeller = createAsyncThunk(
    "user/verify",
    async (data, thunkApi) => {
      try {
        const response = await VerifyUser(data);
        return thunkApi.fulfillWithValue(response);
      } catch (error) {
        return thunkApi.rejectWithValue(error.response.error);
      }
    }
  );

  export const rejectSeller = createAsyncThunk(
    "user/reject",
    async (data, thunkApi) => {
      try {
        const response = await RejectUser(data);
        return thunkApi.fulfillWithValue(response);
      } catch (error) {
        return thunkApi.rejectWithValue(error.response.error);
      }
    }
  );

  export const googleLoginAction = createAsyncThunk(
    "user/google-login",
    async (data, thunkApi) => {
      try {
        const response = await GoogleLogin(data);
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
      logout: (state) => {
        state.token = null;
        state.loggedIn = false;
        localStorage.removeItem("token");
      },
    },
    extraReducers: (builder) => {
        builder.addCase(loginAction.fulfilled, (state, action) => {
          const token = action.payload.token;
          state.token = token;
          state.loggedIn = true;
          state.user = action.payload;
    
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(action.payload));
        });
        builder.addCase(googleLoginAction.fulfilled, (state, action) => {
          const token = action.payload.token;
          state.token = token;
          state.loggedIn = true;
          state.user = action.payload;
    
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(action.payload));
        });
        builder.addCase(registerAction.fulfilled, (state, action) => {
          
        });
        builder.addCase(profileAction.fulfilled, (state, action) => {
          const token = action.payload.token;
          state.token = token;
          state.loggedIn = true;
        });
        builder.addCase(profileImageAction.fulfilled, (state, action) => {
          const imageSrc = URL.createObjectURL(new Blob([action.payload]));
          state.user = { ...state.user, imageSrc: imageSrc };
        });
        builder.addCase(getSellersForVerification.fulfilled, (state, action) => {
          state.sellers = action.payload;
        });
        builder.addCase(verifySeller.fulfilled, (state, action) => {
        });
    },
    
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;