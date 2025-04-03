import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FormState = {
  id: string;
  password: string;
  name: string;
  birthday: number;
  phoneNumber: string;
  imageUrl?: string | null;
  nickname: string;
  artworkId: string[];
  color: string[];
};

const initialState: FormState = {
  id: "",
  password: "",
  name: "",
  birthday: 0,
  phoneNumber: "",
  imageUrl: null,
  nickname: "",
  artworkId: [],
  color: [],
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
