import { BASE_URL } from "@/shared/api/baseUrl";
import { api } from "@/shared/api/core";
import { changePasswordAPI, updateUserInfoAPI } from "@/shared/api/user";
import useToast from "@/shared/hooks/useToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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

export default function useProfile() {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function getProfile(): Promise<profileType> {
    const response = await api.get(`${USER_BASE_URL}/profile`);

    const { success, errorMsg, data } = response.data;

    if (!success) {
      // showToast({
      //   message: errorMsg || "회원 정보 등급 조회를 실패했습니다",
      //   type: "error",
      // });
      console.error(errorMsg);
    } else {
      const userData = { nickname: data?.nickname, s3Url: data?.userImageUrl };
      sessionStorage.setItem("user", JSON.stringify(userData));
    }
    return data;
  }

  const updateUserInfoMutation = useMutation({
    mutationFn: updateUserInfoAPI,
    onSuccess: (data) => {
      const { success, errorMsg } = data;
      if (!success) {
        showToast({
          message: errorMsg || "회원 정보 수정을 실패했습니다.",
          type: "error",
        });
      } else {
        queryClient.invalidateQueries({ queryKey: ["profile"] });
        showToast({
          message: "회원 정보를 성공적으로 수정했습니다.",
          type: "success",
        });
        navigate("/profile");
      }
    },
    onError: () => {
      showToast({
        message: "회원 정보 수정 중 오류가 발생했습니다.",
        type: "error",
      });
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: changePasswordAPI,
    onSuccess: (data) => {
      const { success, errorMsg } = data;
      if (!success) {
        showToast({
          message: errorMsg || "비밀번호 수정을 실패했습니다.",
          type: "error",
        });
      } else {
        showToast({
          message: "비밀번호를 성공적으로 수정했습니다.",
          type: "success",
        });
        navigate("/profile");
      }
    },
    onError: () => {
      showToast({
        message: "비밀번호 수정 중 오류가 발생했습니다.",
        type: "error",
      });
    },
  });

  async function verifyPassword(password: string) {
    const response = await api.post(`${USER_BASE_URL}/verify-password`, {
      password,
    });

    const { success, errorMsg } = response.data;

    if (!success) {
      showToast({
        message: errorMsg || "비밀번호가 일치하지 않습니다.",
        type: "error",
      });
    } else {
      showToast({
        message: "비밀번호가 일치합니다.",
        type: "success",
      });
      navigate("/profile/update");
    }
  }

  return {
    getProfile,
    updateUserInfo: updateUserInfoMutation.mutate,
    verifyPassword,
    changePassword: changePasswordMutation.mutate,
  };
}
