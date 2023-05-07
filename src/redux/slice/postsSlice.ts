import { extraReducerStatusHandle, getWithExpiry, setWithExpiry } from "@helper";
import { AnyAction, createSlice } from "@reduxjs/toolkit";
import { IReduxState } from "@types";
// export const fetchAllPost = createAsyncThunk(
//   "posts/fetchAll",
//   async (params, thunkAPI) => {
//     return [];
//   }
// );
const postsSlice = createSlice({
  name: "posts",
  initialState: {
    status: "idle",
    data: getWithExpiry("_posts") || [],
    error: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    extraReducerStatusHandle(builder, {
      pen: (state: IReduxState, action: AnyAction) => {
        state.status = "loading";
        state.data = [];
        state.error = {};
      },
      ful: (state: IReduxState, action: AnyAction) => {
        state.status = "idle";
        state.data = action.payload;
        state.error = {};
        setWithExpiry("_posts", action.payload, 7);
      },
      rej: (state: IReduxState, action: AnyAction) => {
        state.status = "idle";
        state.error = action.payload;
        state.data = [];
      },
    });
  },
});
export default postsSlice.reducer;
