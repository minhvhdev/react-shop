import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ProductApi from 'api/ProductApi';
import { getWithExpiry, setWithExpiry } from 'lib/Helper';

export const fetchAllProduct = createAsyncThunk(
    'products/fetchAll',
    // @ts-ignore
    async (params, thunkAPI) => {
        const response = await ProductApi.getAll()
        return response
    }
);
const productsSlice = createSlice({
    name: 'products',
    initialState: { status: 'idle', data: getWithExpiry("_products") || [], error: {} },
    // initialState: { status: 'idle', data:[], error: {} },
    reducers: {},
    extraReducers: {
        // @ts-ignore
        [fetchAllProduct.pending.type]: (state, action) => {
            state.status = 'loading';
        },
        // @ts-ignore
        [fetchAllProduct.fulfilled]: (state, action) => {
            state.status = 'idle';
            state.data = action.payload;
            state.error = {};
            setWithExpiry("_products", action.payload, 7);
        },
        // @ts-ignore
        [fetchAllProduct.rejected.type]: (state, action) => {
            state.status = 'idle';
            state.data = [];
            state.error = action.payload;
        },
    },
})
const { reducer } = productsSlice;
// export const {} = actions;
export default reducer;