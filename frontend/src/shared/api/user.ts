import { BASE_URL } from "./baseUrl";
import { api } from "./core";

const USER_BASE_URL = `${BASE_URL}/users`;

type UpdatedUserType = {
  nickname: string;
  image: FileList;
};

type profileType = {
  nickname: string;
  userImageUrl: string;
  reviewCount: number;
  artworkLikeCount: number;
  attendance: number;
  grade: string;
};

export async function getProfileAPI(): Promise<profileType> {
  const response = await api.get(`${BASE_URL}/users/profile`);
  const { success, errorMsg, data } = response.data;

  if (!success) {
    console.error(errorMsg);
    throw new Error(errorMsg || "회원 정보 등급 조회를 실패했습니다.");
  } else {
    const userData = { nickname: data?.nickname, s3Url: data?.userImageUrl };
    sessionStorage.setItem("user", JSON.stringify(userData));
  }

  return data;
}

export async function updateUserInfoAPI(enteredData: UpdatedUserType) {
  const formData = new FormData();
  formData.append(
    "data",
    new Blob([JSON.stringify({ nickname: enteredData.nickname })], {
      type: "application/json",
    })
  );

  if (enteredData.image && enteredData.image.length > 0) {
    formData.append("file", enteredData.image[0]);
  }

  const response = await api.post(`${USER_BASE_URL}/update-info`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data; // success, errorMsg, data 포함
}

export async function changePasswordAPI(newPassword: string) {
  const response = await api.post(`${USER_BASE_URL}/update-password`, {
    newPassword,
  });
  return response.data;
}

export async function verifyPasswordAPI(password: string) {
  const response = await api.post(`${USER_BASE_URL}/verify-password`, {
    password,
  });
  return response.data;
}
