import RegisterArtworkForm from "@/features/register/RegisterArtworkForm";
import RegisterColorForm from "@/features/register/RegisterColorForm";
import RegisterImageForm from "@/features/register/RegisterImageForm";
import RegisterInfoForm from "@/features/register/RegisterInfoForm";
import CompletedForm from "@/shared/components/Form/CompletedForm";
import SignupProgressBar from "@/shared/components/progressbar/SignupProgressBar";
import { useState } from "react";

export default function RegisterPage() {
  const [state, setState] = useState<number>(1);

  let content;

  if (state === 1) content = <RegisterInfoForm setStage={setState} />;
  else if (state === 2) content = <RegisterImageForm setStage={setState} />;
  else if (state === 3) content = <RegisterArtworkForm setStage={setState} />;
  else if (state === 4) content = <RegisterColorForm setStage={setState} />;
  else if (state === 5)
    content = (
      <CompletedForm
        msg="회원 가입이 완료되었습니다"
        btnMsg="로그인하러 가기"
        route="/login"
      />
    );

  return (
    <div className={`flex flex-col w-full ${state === 3 ? "p-5" : "p-8"}`}>
      {/* ✅ 단계 진행바는 완료(5단계) 제외하고 보여줌 */}
      {state < 5 && <SignupProgressBar currentStep={state} />}
      {content}
    </div>
  );
}
