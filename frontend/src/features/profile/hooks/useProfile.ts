import {
  changePasswordAPI,
  getProfileAPI,
  updateUserInfoAPI,
  verifyPasswordAPI,
} from "@/shared/api/user";
import useToast from "@/shared/hooks/useToast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export default function useProfile() {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: profileData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfileAPI,
  });

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

  const verifyPasswordMutation = useMutation({
    mutationFn: verifyPasswordAPI,
    onSuccess: (data) => {
      const { success, errorMsg } = data;

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
    },
    onError: () => {
      showToast({
        message: "비밀번호 확인 중 오류가 발생했습니다.",
        type: "error",
      });
    },
  });

  return {
    profileData,
    isLoading,
    isError,
    error,
    updateUserInfo: updateUserInfoMutation.mutate,
    verifyPassword: verifyPasswordMutation.mutate,
    changePassword: changePasswordMutation.mutate,
  };
}
