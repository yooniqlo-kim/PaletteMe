import { useEffect, useState } from "react";
import { useFormSelector } from "@/store/hooks";
import CompletedForm from "@/shared/components/form/CompletedForm";
import { signup } from "@/shared/api/auth";

function RegisterCompletePage() {
  const formState = useFormSelector((state) => state.form);
  const [isFetching, setIsFetching] = useState(true);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchSignup = async () => {
      try {
        const response = await signup(formState.formData);
        const { success, errorMsg } = response.data;
        setSuccess(success);
        setErrorMsg(String(errorMsg) || "");
      } catch (error) {
        console.error("Signup failed", error);
        setErrorMsg("회원가입 중 오류가 발생했습니다.");
      } finally {
        setIsFetching(false);
      }
    };

    fetchSignup();
  }, []);

  let content;

  if (isFetching) {
    content = <p>회원가입 중입니다...</p>;
  } else if (success) {
    content = (
      <CompletedForm
        msg="회원 가입이 완료되었습니다"
        btnMsg="로그인하러 가기"
        route="/login"
      />
    );
  } else {
    content = (
      <p className="text-red-500">{errorMsg || "회원가입에 실패했습니다."}</p>
    );
  }

  return <div className="flex flex-col w-full p-8">{content}</div>;
}

export default RegisterCompletePage;
