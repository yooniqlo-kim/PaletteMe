import { configureStore } from "@reduxjs/toolkit";
import { formSlice } from "./formSlice";
import { userSlice } from "./userSlice";

export const store = configureStore({
  reducer: {
    form: formSlice.reducer,
    user: userSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
