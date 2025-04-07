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
      state.id = action.payload.id;
      state.nickname = action.payload.nickname;
      state.s3Url = action.payload.s3Url;
    },
    clearLoginData(state) {
      state.id = "";
      state.nickname = "";
      state.s3Url = "";
    },
  },
});

export const { setLoginData, clearLoginData } = userSlice.actions;
export default userSlice.reducer;
