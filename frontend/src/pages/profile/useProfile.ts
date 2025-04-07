import { BASE_URL } from "@/shared/api/baseUrl";
import { api } from "@/shared/api/core";
import useToast from "@/shared/hooks/useToast";
import { useNavigate } from "react-router";

const USER_BASE_URL = `${BASE_URL}/users`;

type profileType = {
  nickname: string;
  userImageUrl: string;
  reviewCount: number;
  artworkLikeCount: number;
  attendance: number;
  grade: string;
};

type UpdatedUserType = {
  nickname: string;
  image: FileList;
};

export default function useProfile() {
  const { showToast } = useToast();
  const navigate = useNavigate();
  async function getProfile(): Promise<profileType> {
    const response = await api.get(`${USER_BASE_URL}/profile`);

    const { success, errorMsg, data } = response.data;

    if (!success) {
      showToast({
        message: errorMsg || "회원 정보 등급 조회를 실패했습니다",
        type: "error",
      });
    }

    return data;
  }

  async function updateUserInfo(enteredData: UpdatedUserType) {
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

    const { success, errorMsg, data } = response.data;

    if (!success) {
      showToast({
        message: errorMsg || "회원 정보 수정을 실패했습니다.",
        type: "error",
      });
    } else {
      showToast({
        message: "회원 정보를 성공적으로 수정했습니다.",
        type: "success",
      });
      navigate("/profile");
    }

    return data;
  }

  return { getProfile, updateUserInfo };
}
