import Button from "@/shared/components/buttons/Button";
import Input from "@/shared/components/form/Input";
import InputContainer from "@/shared/components/form/InputContainer";
import Label from "@/shared/components/form/Label";
import { useForm } from "react-hook-form";
import useProfile from "./useProfile";
import { passwordValidation } from "@/shared/utils/verifyPassword";

type FormValues = {
  password: string;
  passwordVerification: string;
};

export default function UpdateUserInfoPage() {
  const { changePassword } = useProfile();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormValues>({ mode: "onChange" });

  const password = watch("password");

  function updateUserInfo(data: FormValues) {
    const { password: newPassword } = data;
    changePassword(newPassword);
  }

  return (
    <div className="px-7">
      <form
        onSubmit={handleSubmit(updateUserInfo)}
        className="flex flex-col gap-8 w-full">
        <h2 className="text-lg font-semibold">비밀번호 수정</h2>
        <div className="flex flex-col w-full gap-[33px]">
          <InputContainer>
            <Label htmlFor="password">새 비밀번호</Label>
            <Input
              id="password"
              {...register("password", {
                required: "비밀번호를 입력해주세요",
                validate: passwordValidation,
              })}
              type="password"
              placeholder="비밀번호를 입력해주세요 (8자 이상)"
              fallback={errors.password && errors.password.message}
            />
          </InputContainer>

          <InputContainer>
            <Label htmlFor="passwordVerification">새 비밀번호 확인</Label>
            <Input
              id="passwordVerification"
              {...register("passwordVerification", {
                validate: (value) =>
                  value === password || "비밀번호가 일치하지 않습니다.",
              })}
              type="password"
              placeholder="새 비밀번호를 다시 입력해주세요"
              fallback={
                errors.passwordVerification &&
                errors.passwordVerification.message
              }
            />
          </InputContainer>
        </div>
        <Button size="L" disabled={!isValid || isSubmitting}>
          확인
        </Button>
      </form>
    </div>
  );
}
