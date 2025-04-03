import axios, { AxiosResponse } from "axios";

const AUTH_BASE_URL = "http://70.12.246.134:8080/api/users";

type dataType = {
  id: string;
  nickname: string;
  s3Url: string;
  accessToken: string;
};

type ResponseType = {
  success: boolean;
  errorMsg: number;
  errorCode: string;
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

export async function checkId(data: { id: string }) {
  const response: AxiosResponse<ResponseType> = await axios.post(
    `${AUTH_BASE_URL}/check-id`,
    data
  );
  return response;
}
