import { useFormDispatch, useFormSelector } from "@/store/hooks";
import CompletedForm from "@/shared/components/form/CompletedForm";
import { resetField } from "@/store/formSlice";
import { useEffect } from "react";

function RegisterCompletePage() {
  const dispatch = useFormDispatch();
  const formData = useFormSelector((state) => state.form);

  useEffect(() => {
    dispatch(resetField());
    console.log(formData);
  }, []);
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
