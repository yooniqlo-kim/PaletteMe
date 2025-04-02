import { useFormDispatch } from "@/store/hooks";
import Button from "@/shared/components/buttons/Button";
import FormWrapper from "@/shared/components/form/FormWrapper";
import Input from "@/shared/components/form/Input";
import InputContainer from "@/shared/components/form/InputContainer";
import Label from "@/shared/components/form/Label";
import { updateField } from "@/store/formSlice";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

type FormValues = {
  id: string;
  password: string;
  confirmPassword: string;
  name: string;
  year: number;
  phone: number;
  verificationCode: number;
};

export default function RegisterInfoPage() {
  const dispatch = useFormDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormValues>({ mode: "onChange" });

  function onSubmit(data: FormValues) {
    console.log(data);
    dispatch(
      updateField({
        id: data.id,
        password: data.password,
        name: data.name,
        birthday: data.year.toString(),
        phoneNumber: data.phone.toString(),
      })
    );
    navigate("/signup/profile");
  }

  return (
    <FormWrapper>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-8 w-full">
        <h2 className="text-lg font-semibold">회원가입</h2>
        <div className="flex flex-col w-full gap-[33px]">
          <InputContainer>
            <Label htmlFor="id">아이디</Label>
            <span className="flex justify-between w-full gap-4">
              <Input
                {...register("id", { required: "아이디는 필수값입니다." })}
                id="id"
                type="text"
                placeholder="아이디를 입력해주세요"
                fallback={errors.id && errors.id.message}
              />
              <Button size="XS">중복 확인</Button>
            </span>
          </InputContainer>

          <InputContainer>
            <Label htmlFor="password">비밀번호</Label>
            <Input
              {...register("password", {
                required: "비밀번호는 필수값입니다.",
                minLength: { value: 8, message: "8자 이상 입력해주세요." },
              })}
              id="password"
              type="password"
              placeholder="비밀번호를 입력해주세요 (8자 이상)"
              fallback={errors.password && errors.password.message}
            />
          </InputContainer>

          <InputContainer>
            <Label htmlFor="confirmPassword">비밀번호 재입력</Label>
            <Input
              {...register("confirmPassword", {
                required: "비밀번호 확인이 필요합니다.",
                validate: (value) =>
                  value === getValues("password") ||
                  "위에서 입력한 비밀번호와 일치하지 않습니다.",
              })}
              id="confirmPassword"
              type="password"
              placeholder="위에서 입력한 비밀번호를 다시 입력해주세요"
              fallback={
                errors.confirmPassword && errors.confirmPassword.message
              }
            />
          </InputContainer>

          <InputContainer>
            <Label htmlFor="name">이름</Label>
            <Input
              {...register("name", { required: "이름은 필수값입니다." })}
              id="name"
              type="text"
              placeholder="홍길동"
              fallback={errors.name && errors.name.message}
            />
          </InputContainer>

          <InputContainer>
            <Label htmlFor="birthdate">태어난 연도</Label>
            <Input
              {...register("year", {
                required: "태어난 연도를 입력해주세요.",
              })}
              id="year"
              type="number"
              min="1900"
              max={new Date().getFullYear()}
              fallback={errors.year && errors.year.message}
            />
          </InputContainer>

          <InputContainer>
            <Label htmlFor="phone">전화번호</Label>
            <span className="flex justify-between w-full gap-4">
              <Input
                {...register("phone", { required: "전화번호는 필수값입니다." })}
                id="phone"
                type="number"
                placeholder="전화번호 입력 ( - 제외)"
                fallback={errors.phone && errors.phone.message}
              />
              <Button size="XS">번호 전송</Button>
            </span>
          </InputContainer>

          <InputContainer>
            <Label htmlFor="verificationCode">인증번호 입력</Label>
            <span className="flex justify-between w-full gap-4">
              <Input
                {...register("verificationCode", {
                  required: "인증번호를 입력해주세요.",
                })}
                id="verificationCode"
                type="number"
                placeholder="인증번호 6자리 입력"
                fallback={
                  errors.verificationCode && errors.verificationCode.message
                }
              />
              <Button size="XS">확인</Button>
            </span>
          </InputContainer>
        </div>
        <Button size="L" disabled={isSubmitting || !isValid}>
          다음으로
        </Button>
      </form>
    </FormWrapper>
  );
}
