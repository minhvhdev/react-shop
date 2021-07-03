import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import RatingApi from 'api/RatingApi';

export const fetchAllRate = createAsyncThunk(
    'rates/fetchAll',
    async (params) => {
        return await RatingApi.getRate(params);
    }
);
const ratingSlice = createSlice({
    name: 'ratings',
    initialState: { status: 'idle', data: [], error: {}},
    reducers: {
        addRate:(state,action)=>{
            state.data.unshift(action.payload);
        },
        updateRate:(state,action)=>{
            state.data.forEach(rate => {
                if(rate.yourRate===true){
                    rate.content = action.payload.content;
                    rate.star = action.payload.star;
                    rate.createDate= new Date();
                }
            });
        }
    },
    extraReducers: {
        // @ts-ignore
        [fetchAllRate.pending.type]: (state, action) => {
            state.status = 'loading';
        },
        // @ts-ignore
        [fetchAllRate.fulfilled]: (state, action) => {
            state.status = 'idle';
            state.data = action.payload;
            state.error = {};
        },
        // @ts-ignore
        [fetchAllRate.rejected.type]: (state, action) => {
            state.status = 'idle';
            state.data = [];
            state.error = action.payload;
        },
    },
})
const { reducer,actions } = ratingSlice;
export const {addRate,updateRate} = actions;
export default reducer;