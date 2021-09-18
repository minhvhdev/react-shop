import { configureStore } from "@reduxjs/toolkit";
import loggedReducer from './slice/userSlice';
import productsReducer from './slice/productSlice';
import postsReducer from './slice/postsSlice';
import ratingReducer from './slice/ratingSlice';
import shopcart from './slice/shopcartSlice';
import order from './slice/orderSlice';
import address from './slice/addressSlice';
const store = configureStore({
    reducer: {
        logged: loggedReducer,
        products: productsReducer,
        posts: postsReducer,
        rates: ratingReducer,
        shopcart: shopcart,
        order: order,
        address: address,
    }
})
export default store;