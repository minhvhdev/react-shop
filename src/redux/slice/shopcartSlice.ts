import { createSlice } from '@reduxjs/toolkit';
import { IOrder, IProduct, IReduxState, IShopcartItem } from '@types';

function addProduct(arr: IShopcartItem[], data: IShopcartItem) {
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    const item = arr[i];
    if (item.product.id === data.product.id && item.type === data.type) {
      item.quantity += data.quantity;
      return arr;
    }
  }
  arr.push(data);
  return arr;
}

const initValue: IReduxState<IShopcartItem[]> = { status: 'idle', data: [], error: {} };

const shopcartSlice = createSlice({
  name: 'shopcart',
  initialState: initValue,
  reducers: {
    initialCart: (state) => {
      state.data = JSON.parse(localStorage.getItem('_shopcart') || '[]');
    },
    addToCart: (state, action) => {
      state.data = addProduct(state.data, action.payload);
      localStorage.setItem('_shopcart', JSON.stringify(state.data));
    },
    updateQuantity: (state, action) => {
      action.payload.forEach((element) => {
        state.data[element.index].quantity = element.value;
      });
      localStorage.setItem('_shopcart', JSON.stringify(state.data));
    },
    removeItem: (state, action) => {
      const index = +action.payload;
      state.data.splice(index, 1);
      localStorage.setItem('_shopcart', JSON.stringify(state.data));
    },
    asyncCart: (state, action) => {
      state.data = action.payload;
    },
    resetCart: (state) => {
      state.data = [];
      localStorage.removeItem('_shopcart');
    }
  }
});
const { reducer, actions } = shopcartSlice;
export const { addToCart, updateQuantity, removeItem, asyncCart, resetCart, initialCart } = actions;
export default reducer;
