import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  id: string;
  nickname: string;
  s3Url: string;
};

const initialState: UserState = {
  id: "",
  nickname: "",
  s3Url: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoginData(state, action: PayloadAction<UserState>) {
      return action.payload;
    },
    clearLoginData(state) {
      return initialState;
    },
  },
});

export const { setLoginData, clearLoginData } = userSlice.actions;
export default userSlice.reducer;
