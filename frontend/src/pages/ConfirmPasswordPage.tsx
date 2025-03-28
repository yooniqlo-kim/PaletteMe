import ConfirmPasswordForm from "@/features/profile/ConfirmPasswordForm";

export default function ConfirmPasswordPage() {
  return (
    <div className="px-7">
      <h2 className="text-lg font-semibold">회원 정보 수정</h2>
      <div
        className="flex justify-center items-center"
        style={{ minHeight: "calc(100vh - 180px)" }}>
        <ConfirmPasswordForm />
      </div>
    </div>
  );
}
