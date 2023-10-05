import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IData } from "./Test/Table";

export const fetchData = createAsyncThunk<IData[]>("fetch_data", async () => {
  const response = await fetch(
    `https://eztrade.fpts.com.vn/hsx/data.ashx?s=quote&l=All`
  );
  return response.json();
});

export const fetchCate = createAsyncThunk("fetch_cate", async () => {
  const response = await fetch(
    `https://eztrade.fpts.com.vn/api/ApiData/get_cache_stockinfo`
  );
  const convert = await response.json();
  const res = JSON.parse(convert);
  return res;
});

const reducer = createSlice({
  name: "change",
  initialState: {
    title: "PD",
    table: [] as any,
    category: [] as any,
    loading: false,
  },
  reducers: {
    change: (state, action) => {
      state.title = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = false;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = true;
        state.table = action.payload;
      })
      .addCase(fetchCate.pending, (state) => {
        state.loading = false;
      })
      .addCase(fetchCate.fulfilled, (state, action) => {
        state.loading = true;
        state.category = action.payload;
      });
  },
});

export const { change } = reducer.actions;

export default reducer.reducer;
