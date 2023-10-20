import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IData } from "./Test/Table";
import {
  getDataApi,
  // getDataApiTest,
  updateImmutableObject,
} from "./Test/getApi";

export const fetchData = createAsyncThunk<IData[], string>(
  "fetch_data",
  async (san) => {
    if (san === "hsx") {
      const hsx = await fetch(
        `https://eztrade.fpts.com.vn/hsx/data.ashx?s=quote&l=All`
      );

      const resHSX = await hsx.json();
      return resHSX;
    } else {
      if (san === "hnx") {
        const hnx = await fetch(
          `https://eztrade.fpts.com.vn/hnx/data.ashx?s=quote&l=HNX30`
        );
        const resHNX = await hnx.json();
        return resHNX;
      } else {
        return [];
      }
    }
  }
);

const reducer = createSlice({
  name: "change",
  initialState: {
    title: "PD",
    table: [] as any,
    // secInfo: [] as any,
    // secInfoMap: [] as any,
    loading: false,
  },
  reducers: {
    change: (state, action) => {
      state.title = action.payload;
    },
    updateRealTime: (state, action) => {
      if (Object.keys(action.payload.realtime).length === 0) {
        return state;
      } else {
        state.table = updateImmutableObject(
          action.payload.table,
          action.payload.realtime
        );
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = false;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        // console.log({ test: getDataApiTest(action.payload) });

        state.loading = true;
        state.table = getDataApi(action.payload);
      });
  },
});

export const { change, updateRealTime } = reducer.actions;

export default reducer;
