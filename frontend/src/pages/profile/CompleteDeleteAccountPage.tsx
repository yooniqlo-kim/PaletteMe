import useDeleteAccount from "@/features/profile/hooks/useDeleteAccount";
import CompletedForm from "@/shared/components/form/CompletedForm";
import LoadingDots from "@/shared/components/loading/LoadingDots";
import { useEffect, useState } from "react";

export default function CompleteDeleteAccountPage() {
  const { deleteAccount, isPending } = useDeleteAccount();
  const [isDeleteSuccess, setIsDeleteSuccess] = useState<boolean | null>(null);

  useEffect(() => {
    const doDelete = async () => {
      try {
        const response = await deleteAccount();
        setIsDeleteSuccess(response.success);
      } catch (e) {
        setIsDeleteSuccess(false);
      }
    };

    doDelete();
  }, [deleteAccount]);

  let content;

  if (isPending || isDeleteSuccess === null) {
    const loadingDots = <LoadingDots />;
    content = <CompletedForm msg="탈퇴 진행 중입니다" btnMsg={loadingDots} />;
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

  return <div className="px-6 flex p-2">{content}</div>;
}
