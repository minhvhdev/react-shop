import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'universal-cookie';


const cookies = new Cookies();
const token = cookies.get('_token');


const userSlice = createSlice({
    name: 'logged',
    initialState: { status: 'idle', data: token, error: {} },
    reducers: {
        logout: (state) => {
            cookies.remove('_token', { path: '/' });
            state.data = null;
        },
        login: (state, action) => {
            const res = action.payload;
            const token = {
                accessToken: res.accessToken,
                fullName: res.fullName,
                phone: res.phone || '',
                avatarLink: res.avatarLink,
                role: res.role,
                emailVerify: res.emailVerify
            }
            state.data = token;
            cookies.set("_token", token, { path: "/", maxAge: 3153600000 });

        },
        verifySuccess: (state) => {
            state.data.emailVerify = true;
            cookies.set("_token", state.data, { path: "/", maxAge: 3153600000 });
        },
        updateInfo: (state, action) => {
            state.data.phone = action.payload.phone;
            state.data.fullName = action.payload.fullName;
            cookies.set("_token", state.data, { path: "/", maxAge: 3153600000 });
        },
        updateEmail: (state) => {
            state.data.emailVerify = false;
            cookies.set("_token", state.data, { path: "/", maxAge: 3153600000 });
        }

    },
})
const { reducer, actions } = userSlice;
export const { logout, login, verifySuccess, updateInfo, updateEmail } = actions;
export default reducer;