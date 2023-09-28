import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IData } from "./Test/Table";

export const fetchData = createAsyncThunk<IData[]>("fetch_data", async () => {
  const response = await fetch(
    `https://eztrade.fpts.com.vn/hsx/data.ashx?s=quote&l=All`
  );
  return response.json();
});

const reducer = createSlice({
  name: "change",
  initialState: {
    title: "PD",
    table: [] as any,
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
      });
  },
});

export const { change } = reducer.actions;

export default reducer.reducer;
