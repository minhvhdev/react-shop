import { configureStore } from '@reduxjs/toolkit';
import order from './slice/orderSlice';
import shopcart from './slice/shopcartSlice';
const store = configureStore({
  reducer: {
    shopcart: shopcart,
    order: order
  }
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
