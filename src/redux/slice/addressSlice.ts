import { createSlice } from "@reduxjs/toolkit";

const addressSlice = createSlice({
  name: "address",
  initialState: { status: "idle", data: [], error: {} },
  reducers: {
  },
});
const { reducer, actions } = addressSlice;
export const {
} = actions;
export default reducer;
