import { useNavigate } from "react-router";
import useToast from "@/shared/hooks/useToast";
import { checkId, login } from "@/shared/api/auth";
import { UserType } from "./type";

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

  return { handleLogin, isLoggedIn };
}
