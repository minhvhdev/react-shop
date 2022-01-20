import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AddressApi from "api/AddressApi";

export const socialAsyncAddress = createAsyncThunk("user/async", async() => {
    const address = await AddressApi.socialAsyncAddress();
    localStorage.setItem("_address", JSON.stringify(address));
    console.log(address);
    return address;
});
const save = (arr, address) => {
    let isUpdate = false;
    const len = arr.length;
    let index = 0;
    for (let i = 0; i < len; i++) {
        const element = arr[i];
        if (element.id === address.id) {
            isUpdate = true;
            index = i;
        }
    }
    if (isUpdate) {
        arr[index] = address;
    } else {
        arr.push(address);
    }
    return arr;
};
const remove = (arr, id) => {
    const len = arr.length;
    let index = -1;
    for (let i = 0; i < len; i++) {
        const element = arr[i];
        if (element.id === +id) {
            index = i;
        }
    }
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
};
const addressDefault = (arr, id) => {
    const len = arr.length;
    for (let i = 0; i < len; i++) {
        const element = arr[i];
        if (element.mainAddress) {
            element.mainAddress = false;
        }
        if (element.id === +id) {
            element.mainAddress = true;
        }
    }
    return arr;
};
const addressSlice = createSlice({
    name: "address",
    initialState: { status: "idle", data: [], error: {} },
    reducers: {
        initialAddress: (state) => {
            state.data = JSON.parse(localStorage.getItem("_address")) || [];
        },
        saveAddress: (state, action) => {
            const arr = save(state.data || [], action.payload);
            state.data = arr;
        },
        removeAddress: (state, action) => {
            const arr = remove(state.data || [], action.payload);
            state.data = arr;
        },
        setDefault: (state, action) => {
            const arr = addressDefault(state.data, action.payload);
            state.data = arr;
        },
        asyncAddress: (state, action) => {
            state.data = action.payload;
        },
        resetAddress: (state) => {
            state.data = null;
        },
    },
    extraReducers: {
        [socialAsyncAddress.fulfilled.type]: (state, action) => {
            state.data = action.payload;
        },
    },
});
const { reducer, actions } = addressSlice;
export const {
    saveAddress,
    removeAddress,
    asyncAddress,
    resetAddress,
    setDefault,
    initialAddress,
} = actions;
export default reducer;