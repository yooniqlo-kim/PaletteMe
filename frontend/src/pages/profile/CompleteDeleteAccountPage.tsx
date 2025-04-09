import { useAuth } from "@/features/auth/useAuth";
import CompletedForm from "@/shared/components/form/CompletedForm";
import { useEffect } from "react";

export default function CompleteDeleteAccountPage() {
  const { deleteAccount, isDeleting } = useAuth();

  useEffect(() => {
    deleteAccount();
  }, [deleteAccount]);

  return (
    <div>
      {isDeleting ? (
        <div className="flex p-2">
          <CompletedForm msg="탈퇴 진행 중입니다" btnMsg="..." />
        </div>
      ) : (
        <div className="flex p-2">
          <CompletedForm
            msg="탈퇴가 완료되었습니다"
            btnMsg="홈으로 가기"
            route="/"
          />
        </div>
      )}
    </div>
  );
}
