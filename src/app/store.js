import { configureStore } from "@reduxjs/toolkit";
import loggedReducer from './slice/headerSlice';
import productsReducer from './slice/productSlice';
import postsReducer from './slice/postsSlice';
import ratingReducer from './slice/ratingSlice';
import shopcart from './slice/shopcartSlice';

const store = configureStore({
    reducer: {
        logged: loggedReducer,
        products: productsReducer,
        posts: postsReducer,
        rates: ratingReducer,
        shopcart: shopcart
    }
})
export default store;