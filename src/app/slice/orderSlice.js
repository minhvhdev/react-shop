import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import OrderApi from 'api/OrderApi';

const order = {
    fullName: '',
    phone: '',
    note: '',
    shippingFee: 0,
    promotionCode: null,
    orderItem: [],
    address: "",
    buyNow: false
}
export const checkShippingFee = createAsyncThunk('order/shippingFee', async (districtId) => {
    const fee = await OrderApi.checkShippingFee(districtId);
    return fee.data.data.total;
});
const orderSlice = createSlice({
    name: 'orders',
    initialState: { status: 'idle', data: JSON.parse(sessionStorage.getItem("_order")) || order, error: {} },
    reducers: {
        createOrder: (state, action) => {
            state.data.orderItem = action.payload;
            state.data.buyNow = false;
            sessionStorage.setItem("_order", JSON.stringify(state.data));
        },
        addPromotion: (state, action) => {
            state.data.promotionCode = action.payload;
            sessionStorage.setItem("_order", JSON.stringify(state.data));
        },
        removePromotion: (state) => {
            state.data.promotionCode = null;
            sessionStorage.setItem("_order", JSON.stringify(state.data));
        },
        resetOrder: (state) => {
            state.data = order;
            sessionStorage.removeItem("_order");
        },
        createBuyNowOrder: (state, action) => {
            state.data.orderItem = action.payload;
            state.data.buyNow = true;
            sessionStorage.setItem("_order", JSON.stringify(state.data));
        }
    },
    extraReducers: {
        [checkShippingFee.pending.type]: (state, action) => {
            state.status = "loading"
        },
        [checkShippingFee.fulfilled.type]: (state, action) => {
            state.status = "idle";
            state.data.shippingFee = action.payload;
        },
        [checkShippingFee.rejected.type]: (state, action) => {
            state.status = "idle";
            state.error = action.payload;
        }
    }
})
const { reducer, actions } = orderSlice;
export const { createOrder, addPromotion, removePromotion, resetOrder, createBuyNowOrder } = actions;
export default reducer;