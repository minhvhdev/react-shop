import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const token = cookies.get('_token') || {};
//Quản lý state check login cho header để hiển thị avatar và tên
export const login = createAsyncThunk('user/login', async (response) => {
    cookies.set("_token", response, { path: "/", maxAge: 3153600000 });
    return response;
});
export const socialLogin = createAsyncThunk('user/login', async (response) => {
    cookies.set("_token", response, { path: "/", maxAge: 3153600000 });
    return response;
});
const loggedHeaderSlice = createSlice({
    name: 'logged',
    initialState: { status: 'idle', data: token, error: {} },
    reducers: {
        logout: (state) => {
            console.log(state);
            cookies.remove('_token');
            state.data = {};
        },
    },
    extraReducers: {
        [login.fulfilled.type]: (state, action) => {
            state.status = 'idle';
            state.data = action.payload;
        },
        [socialLogin.fulfilled.type]: (state, action) => {
            state.status = 'idle';
            state.data = action.payload;
        }
    }
})
const { reducer, actions } = loggedHeaderSlice;
export const { logout } = actions;
export default reducer;