import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  wishlistItems: [],
  isLoading: false,
};

export const addToWishlist = createAsyncThunk(
  "cart/addToWishlist",
  async ({ userId, productId }) => {
    const response = await axios.post(
      "https://ecommerce-app-xg3v.onrender.com/api/shop/wishlist/add",
      {
        userId,
        productId,
      }
    );

    return response.data;
  }
);

export const fetchWishlistItems = createAsyncThunk(
  "cart/fetchWishlistItems",
  async (userId) => {
    const response = await axios.get(
      `https://ecommerce-app-xg3v.onrender.com/api/shop/wishlist/get/${userId}`
    );

    return response.data;
  }
);

export const deleteWihslistItem = createAsyncThunk(
  "cart/deleteWihslistItem",
  async ({ userId, productId }) => {
    const response = await axios.delete(
      `https://ecommerce-app-xg3v.onrender.com/api/shop/wishlist/${userId}/${productId}`
    );

    return response.data;
  }
);

const shoppingWishlistSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToWishlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(addToWishlist.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(fetchWishlistItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchWishlistItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(fetchWishlistItems.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(deleteWihslistItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteWihslistItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(deleteWihslistItem.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      });
  },
});

export default shoppingWishlistSlice.reducer;