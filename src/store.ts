import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import testSlice from "./testSlice";
// import logger from "redux-logger";

const store = configureStore({
  reducer: {
    table: testSlice.reducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({ serializableCheck: false })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch; // Export a hook that can be reused to resolve types
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
