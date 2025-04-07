import { BASE_URL } from "@/shared/api/baseUrl";
import { api } from "@/shared/api/core";
import useToast from "@/shared/hooks/useToast";

const USER_BASE_URL = `${BASE_URL}/users`;

type profileType = {
  reviewCount: number;
  artworkLikeCount: number;
  attendance: number;
  grade: string;
};

export default function useProfile() {
  const { showToast } = useToast();
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
  return { getProfile };
}
