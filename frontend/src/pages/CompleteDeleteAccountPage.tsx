import CompletedForm from "@/shared/components/form/CompletedForm";

export default function CompleteDeleteAccountPage() {
  return (
    <div className="flex p-2">
      <CompletedForm
        msg="탈퇴가 완료되었습니다."
        btnMsg="홈으로 가기"
        route="/"
      />
    </div>
  );
}
