import axios, { AxiosResponse } from "axios";

const AUTH_BASE_URL = "http://70.12.246.87:8080/api/users";

type ResponseType = {
  success: boolean;
  errorMsg: string;
  errorCode: string;
  data: null;
};

export async function checkId(data: { id: string }) {
  const response: AxiosResponse<ResponseType> = await axios.post(
    `${AUTH_BASE_URL}/check-id`,
    data
  );
  return response;
}

export async function sendVerificationCode(data: { phoneNumber: string }) {
  const response: AxiosResponse<ResponseType> = await axios.post(
    `${AUTH_BASE_URL}/phone/send`,
    data
  );
  return response;
}

export async function verifyCode(data: {
  phoneNumber: string;
  verificationCode: string;
}) {
  const response: AxiosResponse<ResponseType> = await axios.post(
    `${AUTH_BASE_URL}/phone/verify`,
    data
  );
  return response;
}

export async function checkNickname(data: { nickname: string }) {
  const response: AxiosResponse<ResponseType> = await axios.post(
    `${AUTH_BASE_URL}/check-nickname`,
    data
  );
  return response;
}

export async function getArtworks() {
  const response: AxiosResponse<{
    success: boolean;
    errorMsg: string | null;
    errorCode: string | null;
    data:
      | Array<{ artworkId: string; imageUrl: string }>
      | { artworkId: string; imageUrl: string }
      | null;
  }> = await axios.get(`${AUTH_BASE_URL}/recommend-artworks`);

  const responseData = response.data.data;

  return Array.isArray(responseData)
    ? responseData
    : responseData
    ? [responseData]
    : [];
}
