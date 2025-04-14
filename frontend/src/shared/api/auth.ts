import { UserFormData } from "@/store/formSlice";
import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "./baseUrl";
import { api } from "./core";

const AUTH_BASE_URL = `${BASE_URL}/users`;

type dataType = {
  id: string;
  nickname: string;
  s3Url: string;
  accessToken: string;
};

type ResponseType = {
  success: boolean;
  errorMsg: number | string;
  errorCode: string | number;
  data: dataType | null;
};

export async function login(data: { id: string; password: string }) {
  const formData = new FormData();
  formData.append("id", data.id);
  formData.append("password", data.password);

  const response: AxiosResponse<ResponseType> = await axios.post(
    `${AUTH_BASE_URL}/login`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response;
}

export async function logoutAPI() {
  const response = await api.post(`${AUTH_BASE_URL}/logout`);
  return response.data;
}

export async function signup(data: UserFormData) {
  const formData = new FormData();

  const extractedData = {
    id: data.id,
    password: data.password,
    name: data.name,
    birthday: data.birthday,
    nickname: data.nickname,
    artworkId: data.artworkId,
    color: data.color,
    phoneNumber: data.phoneNumber,
  };

  formData.append(
    "data",
    new Blob([JSON.stringify(extractedData)], {
      type: "application/json",
    })
  );

  if (data.imageUrl) {
    const response = await fetch(data.imageUrl);
    const blob = await response.blob();

    const file = new File([blob], "profile.jpg", { type: blob.type });
    formData.append("file", file);
  }

  const response: AxiosResponse<ResponseType> = await axios.post(
    `${AUTH_BASE_URL}/sign-up`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response;
}
