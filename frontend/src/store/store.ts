import { configureStore } from "@reduxjs/toolkit";
import { formSlice } from "./formSlice";

export const store = configureStore({
  reducer: {
    form: formSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
