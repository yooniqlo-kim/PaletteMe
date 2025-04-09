import { useNavigate } from "react-router";
import useToast from "@/shared/hooks/useToast";
import { inactiveAPI, login, logoutAPI } from "@/shared/api/auth";
import { UserType } from "./type";
import { useMutation } from "@tanstack/react-query";

export function useAuth() {
  const navigate = useNavigate();
  const { showToast } = useToast();

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
      sessionStorage.clear();
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

  const mutation = useMutation<boolean, Error, void>({
    mutationFn: inactiveAPI,
    onSuccess: (data) => {
      const { success, errorMsg } = data as any;
      if (!success) {
        showToast({
          message: errorMsg || "회원 탈퇴를 실패했습니다.",
          type: "error",
        });
      } else {
        sessionStorage.clear();
        showToast({ message: "회원 탈퇴가 완료되었습니다.", type: "success" });
      }
    },
    onError: () => {
      showToast({
        message: "회원 탈퇴 중 오류가 발생했습니다.",
        type: "error",
      });
    },
  });

  const deleteAccount = () => mutation.mutate();

  return {
    handleLogin,
    isLoggedIn,
    logout,
    getUserMeta,
    deleteAccount,
    isDeleting: mutation.isPending,
  };
}
