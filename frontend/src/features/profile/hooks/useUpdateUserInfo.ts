import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserInfoAPI } from "@/shared/api/user";
import useToast from "@/shared/hooks/useToast";
import { useNavigate } from "react-router-dom";

export default function useUpdateUserInfo() {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const { mutate: updateUserInfo, isPending } = useMutation({
    mutationFn: updateUserInfoAPI,
    onSuccess: (data) => {
      const { success, errorMsg } = data;

      if (!success) {
        showToast({
          message: errorMsg || "회원 정보 수정을 실패했습니다.",
          type: "error",
        });
        return;
      }

      showToast({
        message: "회원 정보를 성공적으로 수정했습니다.",
        type: "success",
      });

      queryClient.invalidateQueries({ queryKey: ["profile"] });
      navigate("/profile");
    },
    onError: () => {
      showToast({
        message: "회원 정보 수정 중 오류가 발생했습니다.",
        type: "error",
      });
    },
  });

  return { updateUserInfo, isPending };
}
