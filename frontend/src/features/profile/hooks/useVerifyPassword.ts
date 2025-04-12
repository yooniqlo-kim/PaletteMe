import { useMutation } from "@tanstack/react-query";
import { verifyPasswordAPI } from "@/shared/api/user";
import useToast from "@/shared/hooks/useToast";
import { useNavigate } from "react-router-dom";

export default function useVerifyPassword() {
  const { showToast } = useToast();
  const navigate = useNavigate();

  const { mutate: verifyPassword, isPending } = useMutation({
    mutationFn: verifyPasswordAPI,
    onSuccess: (data) => {
      const { success, errorMsg } = data;

      if (!success) {
        showToast({
          message: errorMsg || "비밀번호가 일치하지 않습니다.",
          type: "error",
        });
        return;
      }

      showToast({
        message: "비밀번호가 일치합니다.",
        type: "success",
      });
      navigate("/profile/update");
    },
    onError: () => {
      showToast({
        message: "비밀번호 확인 중 오류가 발생했습니다.",
        type: "error",
      });
    },
  });

  return { verifyPassword, isPending };
}
