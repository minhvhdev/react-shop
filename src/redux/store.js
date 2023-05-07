import { configureStore } from "@reduxjs/toolkit";
import address from './slice/addressSlice';
import order from './slice/orderSlice';
import postsReducer from './slice/postsSlice';
import shopcart from './slice/shopcartSlice';
const store = configureStore({
    reducer: {
        posts: postsReducer,
        shopcart: shopcart,
        order: order,
        address: address,
    }
})
export default store;