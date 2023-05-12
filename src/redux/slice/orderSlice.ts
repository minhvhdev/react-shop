import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import orderApi from "api/orderApi";

const order = {
  fullName: "",
  phone: "",
  note: "",
  shippingFee: 0,
  promotionCode: null,
  orderItem: [],
  address: "",
  buyNow: false,
};
export const checkShippingFee = createAsyncThunk(
  "order/shippingFee",
  async (districtId: number | string) => {
    const fee = await orderApi.checkShippingFee(districtId);
    return fee.data.data.total;
  }
);
const orderSlice = createSlice({
  name: "orders",
  initialState: { status: "idle", data: order, error: {} },
  reducers: {
    createOrder: (state, action) => {
      state.data.orderItem = action.payload;
      state.data.buyNow = false;
    },
    addPromotion: (state, action) => {
      state.data.promotionCode = action.payload;
    },
    removePromotion: (state) => {
      state.data.promotionCode = null;
    },
    resetOrder: (state) => {
      state.data = order;
    },
    createBuyNowOrder: (state, action) => {
      state.data.orderItem = action.payload;
      state.data.buyNow = true;
    },
  },
  extraReducers: {
    [checkShippingFee.pending.type]: (state, action) => {
      state.status = "loading";
    },
    [checkShippingFee.fulfilled.type]: (state, action) => {
      state.status = "idle";
      state.data.shippingFee = action.payload;
    },
    [checkShippingFee.rejected.type]: (state, action) => {
      state.status = "idle";
      state.error = action.payload;
    },
  },
});
const { reducer, actions } = orderSlice;
export const {
  createOrder,
  addPromotion,
  removePromotion,
  resetOrder,
  createBuyNowOrder,
} = actions;
export default reducer;
