import { useEffect, useState } from "react";
import { useFormSelector } from "@/store/hooks";
import CompletedForm from "@/shared/components/form/CompletedForm";
import { signup } from "@/shared/api/auth";
import LoadingDots from "@/shared/components/loading/LoadingDots";

function RegisterCompletePage() {
  const formState = useFormSelector((state) => state.form);
  const [isFetching, setIsFetching] = useState(true);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchSignup = async () => {
      try {
        if (
          !formState.formData.id ||
          !formState.formData.name ||
          !formState.formData.password ||
          !formState.formData.birthday ||
          !formState.formData.nickname ||
          !formState.formData.phoneNumber ||
          formState.formData.artworkId.length === 0 ||
          formState.formData.color.length === 0
        ) {
          setSuccess(false);
          setErrorMsg(
            "회원가입에 실패했습니다. 입력하지 않은 항목이 있습니다."
          );
          return;
        }
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
    const loadingDots = <LoadingDots />;
    content = (
      <CompletedForm
        msg="회원 가입 중입니다"
        btnMsg={loadingDots}
        route="/login"
      />
    );
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
      <CompletedForm
        msg={errorMsg || "회원가입에 실패했습니다."}
        btnMsg="다시 회원가입하기"
        route="/signup"
      />
    );
  }

  return <div className="flex flex-col w-full p-8">{content}</div>;
}

export default RegisterCompletePage;
