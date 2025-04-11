import { BASE_URL } from "./baseUrl";
import { api } from "./core";

const USER_BASE_URL = `${BASE_URL}/users`;

type UpdatedUserType = {
  nickname: string;
  image: FileList;
};

export async function updateUserInfoAPI(enteredData: UpdatedUserType) {
  const formData = new FormData();
  console.log(enteredData);
  formData.append(
    "data",
    new Blob([JSON.stringify({ nickname: enteredData.nickname })], {
      type: "application/json",
    })
  );

  if (enteredData.image && enteredData.image.length > 0) {
    console.log("!11111");
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
