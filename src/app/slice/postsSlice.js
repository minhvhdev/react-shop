import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import PostApi from 'api/PostApi';
import { getWithExpiry, setWithExpiry } from 'lib/Helper';

export const fetchAllPost = createAsyncThunk(
    'posts/fetchAll',
    // @ts-ignore
    async (params, thunkAPI) => {
        const response = await PostApi.getAll()
        return response
    }
);
const postsSlice = createSlice({
    name: 'posts',
    initialState: { status: 'idle', data: getWithExpiry("_posts") || [], error: {} },
    // initialState: { status: 'idle', data: [], error: {} },
    reducers: {
    },
    extraReducers: {
        [fetchAllPost.pending.type]: (state, action) => {
            state.status = 'loading';
        },
        [fetchAllPost.fulfilled.type]: (state, action) => {
            state.status = 'idle';
            state.data = action.payload;
            state.error = {};
            setWithExpiry("_posts", action.payload, 7);
        },
        [fetchAllPost.rejected.type]: (state, action) => {
            state.status = 'idle';
            state.data = [];
            state.error = action.payload;
        },
    },
})
const { reducer } = postsSlice;
// export const {} = actions;
export default reducer;