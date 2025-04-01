import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FormState = {
  id: string;
  password: string;
  name: string;
  birthday: string;
  phoneNumber: string;
  imageUrl: string;
  nickname: string;
  artworkId: string[];
  color: string[];
  step: number;
};

const initialState: FormState = {
  id: "",
  password: "",
  name: "",
  birthday: "",
  phoneNumber: "",
  imageUrl: "",
  nickname: "",
  artworkId: [],
  color: [],
  step: 2,
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateField(state: FormState, action: PayloadAction<Partial<FormState>>) {
      return { ...state, ...action.payload };
    },
    resetField: () => initialState,
  },
});

export const { updateField, resetField } = formSlice.actions;
