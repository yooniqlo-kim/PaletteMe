import { useAuth } from "@/features/auth/hooks/useAuth";
import CompletedForm from "@/shared/components/form/CompletedForm";
import { useEffect } from "react";

export default function CompleteDeleteAccountPage() {
  const { deleteAccount, isDeleting, isDeleteSuccess } = useAuth();

  useEffect(() => {
    deleteAccount();
  }, []);

  let content;

  if (isDeleting || isDeleteSuccess === null) {
    content = <CompletedForm msg="탈퇴 진행 중입니다" btnMsg="..." />;
  } else if (isDeleteSuccess === true) {
    content = (
      <CompletedForm
        msg="탈퇴가 완료되었습니다"
        btnMsg="홈으로 가기"
        route="/"
      />
    );
  } else {
    content = (
      <CompletedForm
        msg="탈퇴에 실패했습니다. 다시 시도해 주세요."
        btnMsg="홈으로 가기"
        route="/"
      />
    );
  }

  return <div className="px-4 flex p-2">{content}</div>;
}
