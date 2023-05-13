import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IOrder } from '@types';
import orderApi from 'api/orderApi';

const initOrder: IOrder = {
  fullName: '',
  phone: '',
  note: '',
  shippingFee: 0,
  promotionCode: undefined,
  orderItems: [],
  address: '',
  buyNow: false
};
export const checkShippingFee = createAsyncThunk(
  'order/shippingFee',
  async (districtId: string) => {
    const fee = await orderApi.checkShippingFee(districtId);
    return fee.data.data.total;
  }
);
const orderSlice = createSlice({
  name: 'orders',
  initialState: { status: 'idle', data: initOrder, error: {} },
  reducers: {
    createOrder: (state, action) => {
      state.data.orderItems = action.payload;
      state.data.buyNow = false;
    },
    addPromotion: (state, action) => {
      state.data.promotionCode = action.payload;
    },
    removePromotion: (state) => {
      state.data.promotionCode = undefined;
    },
    resetOrder: (state) => {
      state.data = initOrder;
    },
    createBuyNowOrder: (state, action) => {
      state.data.orderItems = action.payload;
      state.data.buyNow = true;
    }
  },
  extraReducers(builder) {
    builder.addCase(checkShippingFee.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(checkShippingFee.fulfilled, (state, action) => {
      state.status = 'idle';
      state.data.shippingFee = action.payload;
    });
    builder.addCase(checkShippingFee.rejected, (state, action) => {
      state.status = 'idle';
      state.error = action.payload as Record<string, unknown>;
    });
  }
});

const { reducer, actions } = orderSlice;
export const { createOrder, addPromotion, removePromotion, resetOrder, createBuyNowOrder } =
  actions;
export default reducer;
