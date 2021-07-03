import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import ShopcartApi from 'api/ShopcartApi';

// export const fetchAllRate = createAsyncThunk(
//     'rates/fetchAll',
//     async (params) => {
//         return await ShopcartApi.getRate(params);
//     }
// );
function addProduct(arr = [], data = {}) {
    const len = arr.length;
    for (let i = 0; i < len; i++) {
        const item = arr[i];
        if (item.product.id === data.product.id && item.type === data.type) {
            item.quantity+=data.quantity;
            return arr;
        }
    }
    arr.push(data);
    return arr;
}
const shopcartSlice = createSlice({
    name: 'shopcarts',
    initialState: { status: 'idle', data: JSON.parse(localStorage.getItem("_shopcart")) || [], error: {} },
    reducers: {
        addToCart: (state, action) => {
            state.data = addProduct(state.data, action.payload);
            localStorage.setItem("_shopcart", JSON.stringify(state.data));
        },
        updateQuantity: (state, action) => {
            state.data[action.payload.index].quantity = action.payload.value;
            localStorage.setItem("_shopcart", JSON.stringify(state.data));
        },
        removeItem: (state, action) => {
            const index = +action.payload;
            state.data.splice(index, 1);
            localStorage.setItem("_shopcart", JSON.stringify(state.data));
        }
    },
    extraReducers: {
        // @ts-ignore
        // [fetchAllRate.pending.type]: (state, action) => {
        //     state.status = 'loading';
        // },
        // // @ts-ignore
        // [fetchAllRate.fulfilled]: (state, action) => {
        //     state.status = 'idle';
        //     state.data = action.payload;
        //     state.error = {};
        // },
        // // @ts-ignore
        // [fetchAllRate.rejected.type]: (state, action) => {
        //     state.status = 'idle';
        //     state.data = [];
        //     state.error = action.payload;
        // },
    },
})
const { reducer, actions } = shopcartSlice;
export const { addToCart, updateQuantity, removeItem } = actions;
export default reducer;