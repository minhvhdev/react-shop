import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ShopcartApi from 'api/ShopcartApi';
import { asyncShopcart } from 'lib/Helper';

function addProduct(arr = [], data = {}) {
    const len = arr.length;
    for (let i = 0; i < len; i++) {
        const item = arr[i];
        if (item.product.id === data.product.id && item.type === data.type) {
            item.quantity += data.quantity;
            return arr;
        }
    }
    arr.push(data);
    return arr;
}
export const socialAsyncCart = createAsyncThunk('shopcart/socialAsync', async() => {
    const serverCart = await ShopcartApi.socialAsyncCart();
    const shopCart = [];
    return shopCart;
});
const shopcartSlice = createSlice({
    name: 'shopcarts',
    initialState: { status: 'idle', data: [], error: {} },
    reducers: {
        addToCart: (state, action) => {
            state.data = addProduct(state.data, action.payload);
        },
        updateQuantity: (state, action) => {
            action.payload.forEach(element => {
                state.data[element.index].quantity = element.value
            });
        },
        removeItem: (state, action) => {
            const index = +action.payload;
            state.data.splice(index, 1);
        },
        asyncCart: (state, action) => {
            state.data = action.payload;
        },
        resetCart: (state) => {
            state.data = [];
        }
    },
    extraReducers: {
        [socialAsyncCart.fulfilled.type]: (state, action) => {
            state.data = action.payload;
        }
    }
})
const { reducer, actions } = shopcartSlice;
export const { addToCart, updateQuantity, removeItem, asyncCart, resetCart } = actions;
export default reducer;