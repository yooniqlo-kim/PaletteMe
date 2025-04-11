import { useMutation } from "@tanstack/react-query";
import { changePasswordAPI } from "@/shared/api/user";
import useToast from "@/shared/hooks/useToast";
import { useNavigate } from "react-router-dom";

export default function useChangePassword() {
  const { showToast } = useToast();
  const navigate = useNavigate();

  const { mutate: changePassword, isPending } = useMutation({
    mutationFn: changePasswordAPI,
    onSuccess: (data) => {
      const { success, errorMsg } = data;

      if (!success) {
        showToast({
          message: errorMsg || "비밀번호 수정을 실패했습니다.",
          type: "error",
        });
        return;
      }

      showToast({
        message: "비밀번호를 성공적으로 수정했습니다.",
        type: "success",
      });
      navigate("/profile");
    },
    onError: () => {
      showToast({
        message: "비밀번호 수정 중 오류가 발생했습니다.",
        type: "error",
      });
    },
  });

  return { changePassword, isPending };
}
