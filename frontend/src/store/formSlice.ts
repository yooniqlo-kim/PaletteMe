import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserFormData = {
  id: string;
  password: string;
  name: string;
  birthday: number;
  phoneNumber: string;
  imageUrl: string | null;
  nickname: string;
  artworkId: string[];
  color: string[];
};

type FormState = {
  formData: UserFormData;
};

const initialState: FormState = {
  formData: {
    id: "",
    password: "",
    name: "",
    birthday: 0,
    phoneNumber: "",
    imageUrl: null,
    nickname: "",
    artworkId: [],
    color: [],
  },
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateField: (state, action: PayloadAction<Partial<UserFormData>>) => {
      Object.assign(state.formData, action.payload);
    },
    resetField: () => initialState,
  },
});

export const { updateField, resetField } = formSlice.actions;
