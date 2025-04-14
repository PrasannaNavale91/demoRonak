import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk(
  "/auth/register",

  async (formData) => {
    const response = await axios.post(
      "https://ecommerce-app-xg3v.onrender.com/api/auth/register",
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        },
      }
    );

    return response.data.message;
  }
);

export const loginUser = createAsyncThunk(
  "/auth/login",

  async (formData) => {
    const response = await axios.post(
      "https://ecommerce-app-xg3v.onrender.com/api/auth/login",
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        },
      }
    );

    return response.data;
  }
);

export const logoutUser = createAsyncThunk(
  "/auth/logout",

  async () => {
    const response = await axios.post(
      "https://ecommerce-app-xg3v.onrender.com/api/auth/logout",
      {},
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        },
      }
    );

    return response.data;
  }
);

export const forgotPassword = createAsyncThunk(
  "/auth/forgot-password",

  async () => {
    const response = await axios.post(
      "https://ecommerce-app-xg3v.onrender.com/api/auth/forgot-password",
      {},
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        },
      }
    );

    return response.data;
  }
);

export const verifyOtp = createAsyncThunk(
  "/auth/verify-otp/:email",

  async () => {
    const response = await axios.post(
      "https://ecommerce-app-xg3v.onrender.com/api/auth/verify-otp/:email",
      {},
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        },
      }
    );

    return response.data;
  }
);

export const resetPassword = createAsyncThunk(
  "/auth/reset-password/:token",

  async () => {
    const response = await axios.post(
      "https://ecommerce-app-xg3v.onrender.com/api/auth/reset-password/:token",
      {},
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        },
      }
    );

    return response.data;
  }
);

export const checkAuth = createAsyncThunk(
  "/auth/checkauth",

  async () => {
    const response = await axios.get(
      "https://ecommerce-app-xg3v.onrender.com/api/auth/check-auth",
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        },
      }
    );

    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    isLoading: true,
  },
  reducers: {
    setUser: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log(action);
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(verifyOtp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;