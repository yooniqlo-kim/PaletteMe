import { useNavigate } from "react-router";
import useToast from "@/shared/hooks/useToast";
import { inactiveAPI, login, logoutAPI } from "@/shared/api/auth";
import { UserType } from "../type/type";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export function useAuth() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [isDeleteSuccess, setIsDeleteSuccess] = useState<boolean | null>(null);

  async function handleLogin(enteredData: { id: string; password: string }) {
    try {
      const response = await login(enteredData);
      console.log("response: ", response);

      const { success, errorCode, data } = response.data;

      if (!success) {
        showToast({ message: `로그인 실패: ${errorCode}`, type: "error" });
      } else {
        showToast({ message: "로그인 성공", type: "success" });
        const userData: UserType = {
          id: data!.id,
          nickname: data!.nickname,
          s3Url: data!.s3Url,
        };
        sessionStorage.setItem("user", JSON.stringify(userData));
        sessionStorage.setItem("token", data!.accessToken);
        navigate("/");
      }
    } catch (error) {
      showToast({ message: "로그인 중 오류가 발생했습니다.", type: "error" });
      console.error(error);
    }
  }

  function isLoggedIn() {
    const user = sessionStorage.getItem("user");
    const token = sessionStorage.getItem("token");
    return user && token;
  }

  async function logout() {
    const data = await logoutAPI();
    const { success, errorMsg } = data;
    if (success) {
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("token");
      navigate("/login");
      showToast({ message: "로그아웃되었습니다.", type: "success" });
    } else {
      showToast({ message: errorMsg || "로그아웃 실패", type: "error" });
    }
  }

  function getUserMeta(): UserType {
    const userData: string = sessionStorage.getItem("user")!;
    const { id, nickname, s3Url } = JSON.parse(userData);
    return { id, nickname, s3Url };
  }

  const mutation = useMutation({
    mutationFn: inactiveAPI,
    onSuccess: (data: any) => {
      const { success, errorMsg } = data;
      if (!success) {
        showToast({
          message: errorMsg || "회원 탈퇴를 실패했습니다.",
          type: "error",
        });
        setIsDeleteSuccess(false);
      } else {
        sessionStorage.clear();
        showToast({ message: "회원 탈퇴가 완료되었습니다.", type: "success" });
        setIsDeleteSuccess(true);
      }
    },
    onError: () => {
      showToast({
        message: "회원 탈퇴 중 오류가 발생했습니다.",
        type: "error",
      });
      setIsDeleteSuccess(false);
    },
  });

  const deleteAccount = () => {
    setIsDeleteSuccess(null); // 상태 초기화
    mutation.mutate();
  };

  return {
    handleLogin,
    isLoggedIn,
    logout,
    getUserMeta,
    deleteAccount,
    isDeleting: mutation.isPending,
    isDeleteSuccess,
  };
}
