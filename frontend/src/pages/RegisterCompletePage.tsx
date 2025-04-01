import CompletedForm from "@/shared/components/form/CompletedForm";

function RegisterCompletePage() {
  return (
    <div className={`flex flex-col w-full p-8`}>
      <CompletedForm
        msg="회원 가입이 완료되었습니다"
        btnMsg="로그인하러 가기"
        route="/login"
      />
    </div>
  );
}

export default RegisterCompletePage;
