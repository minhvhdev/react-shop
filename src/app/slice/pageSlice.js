import { createSlice } from '@reduxjs/toolkit';

const pageSlice = createSlice({
    name: 'isAdmin',
    initialState: {status:false},
    reducers: {
        setUserPage: (state) => {
            state.status = false;
        }, setAdminPage: (state) => {
            state.status = true;
        }
    },
})
const { reducer, actions } = pageSlice;
export const {setUserPage, setAdminPage } = actions;
export default reducer;