import { useMutation } from "@tanstack/react-query";
import { inactiveAPI } from "@/shared/api/user";

export default function useDeleteAccount() {
  const { mutateAsync: deleteAccount, isPending } = useMutation({
    mutationFn: inactiveAPI,
  });

  return { deleteAccount, isPending };
}
