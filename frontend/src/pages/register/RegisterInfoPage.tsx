import { useFormDispatch } from "@/store/hooks";
import Button from "@/shared/components/buttons/Button";
import FormWrapper from "@/shared/components/form/FormWrapper";
import Input from "@/shared/components/form/Input";
import InputContainer from "@/shared/components/form/InputContainer";
import Label from "@/shared/components/form/Label";
import { updateField } from "@/store/formSlice";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import {
  checkId,
  sendVerificationCode,
  verifyCode,
} from "@/shared/api/register";
import { useState } from "react";
import useToast from "@/shared/hooks/useToast";

type FormValues = {
  id: string;
  password: string;
  confirmPassword: string;
  name: string;
  birthday: number;
  phoneNumber: number;
  verificationCode: number;
};

export default function RegisterInfoPage() {
  const [isValidId, setIsValidId] = useState<boolean>(false);
  const [isValidPhoneNumber, SetIsValidPhoneNumber] = useState<boolean>(false);
  const [idMsg, setIdMsg] = useState<string>();
  const [phoneMsg, setPhoneMsg] = useState<string>();
  const [codeMsg, setCodeMsg] = useState<string>();
  const dispatch = useFormDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormValues>({ mode: "onChange" });

  const watchId = watch("id");
  const watchPhoneNumber = watch("phoneNumber");
  const watchVerificationCode = watch("verificationCode");

  async function handleIdCheck() {
    const isValid = await trigger("id");
    if (!isValid) return;

    try {
      const response = await checkId({ id: watchId });
      const { success, errorMsg } = response.data;
      setIsValidId(success ? true : false);
      setIdMsg(success ? "유효한 아이디입니다." : errorMsg);
    } catch (error) {
      showToast({
        message: "아이디 중복 체크 중 문제가 발생했습니다. 다시 시도해주세요",
        type: "error",
      });
    }
  }

  async function handleSendCode() {
    const isValid = await trigger("phoneNumber");
    if (!isValid) return;

    try {
      const response = await sendVerificationCode({
        phoneNumber: watchPhoneNumber.toString(),
      });
      const { success, errorMsg } = response.data;
      setPhoneMsg(success ? "인증번호가 전송되었습니다." : errorMsg);
    } catch (error) {
      showToast({
        message: "인증번호 전송 중 문제가 발생했습니다. 다시 시도해주세요",
        type: "error",
      });
    }
  }

  async function handleCheckCode() {
    const isValid = await trigger("verificationCode");
    if (!isValid) return;

    try {
      const response = await verifyCode({
        phoneNumber: watchPhoneNumber.toString(),
        verificationCode: watchVerificationCode.toString(),
      });
      const { success, errorMsg } = response.data;
      SetIsValidPhoneNumber(success ? true : false);
      setCodeMsg(success ? "인증번호가 일치합니다." : errorMsg);
    } catch (error) {
      showToast({
        message: "인증번호 인증 중 문제가 발생했습니다. 다시 시도해주세요",
        type: "error",
      });
    }
  }

  function onSubmit(data: FormValues) {
    dispatch(
      updateField({
        id: data.id,
        password: data.password,
        name: data.name,
        birthday: data.birthday,
        phoneNumber: data.phoneNumber.toString(),
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
              <div className="flex flex-col grow">
                <Input
                  {...register("id", { required: "아이디는 필수값입니다." })}
                  id="id"
                  type="text"
                  placeholder="아이디를 입력해주세요"
                  fallback={errors.id?.message}
                />
                {idMsg && <p className="text-primary">{idMsg}</p>}
              </div>
              <Button size="XS" type="button" onClick={handleIdCheck}>
                중복 확인
              </Button>
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
              fallback={errors.password?.message}
            />
          </InputContainer>

          <InputContainer>
            <Label htmlFor="confirmPassword">비밀번호 재입력</Label>
            <Input
              {...register("confirmPassword", {
                required: "비밀번호 확인이 필요합니다.",
                validate: (value) =>
                  value === watch("password") ||
                  "위에서 입력한 비밀번호와 일치하지 않습니다.",
              })}
              id="confirmPassword"
              type="password"
              placeholder="위에서 입력한 비밀번호를 다시 입력해주세요"
              fallback={errors.confirmPassword?.message}
            />
          </InputContainer>

          <InputContainer>
            <Label htmlFor="name">이름</Label>
            <Input
              {...register("name", { required: "이름은 필수값입니다." })}
              id="name"
              type="text"
              placeholder="홍길동"
              fallback={errors.name?.message}
            />
          </InputContainer>

          <InputContainer>
            <Label htmlFor="birthday">태어난 연도</Label>
            <Input
              {...register("birthday", {
                required: "태어난 연도를 입력해주세요.",
              })}
              id="birthday"
              type="number"
              min="1900"
              max={new Date().getFullYear()}
              fallback={errors.birthday?.message}
            />
          </InputContainer>

          <InputContainer>
            <Label htmlFor="phoneNumber">전화번호</Label>
            <span className="flex justify-between w-full gap-4">
              <div className="flex flex-col grow">
                <Input
                  {...register("phoneNumber", {
                    required: "전화번호는 필수값입니다.",
                  })}
                  id="phoneNumber"
                  type="number"
                  placeholder="전화번호 입력 ( - 제외)"
                  fallback={errors.phoneNumber?.message}
                />
                {phoneMsg && <p className="text-primary">{phoneMsg}</p>}
              </div>
              <Button size="XS" type="button" onClick={handleSendCode}>
                번호 전송
              </Button>
            </span>
          </InputContainer>

          <InputContainer>
            <Label htmlFor="verificationCode">인증번호 입력</Label>
            <span className="flex justify-between w-full gap-4">
              <div className="flex flex-col grow">
                <Input
                  {...register("verificationCode", {
                    required: "인증번호를 입력해주세요.",
                  })}
                  id="verificationCode"
                  type="number"
                  placeholder="인증번호 6자리 입력"
                  fallback={errors.verificationCode?.message}
                />
                {codeMsg && <p className="text-primary">{codeMsg}</p>}
              </div>
              <Button size="XS" type="button" onClick={handleCheckCode}>
                확인
              </Button>
            </span>
          </InputContainer>
        </div>
        <Button
          size="L"
          disabled={
            !isValidId || !isValidPhoneNumber || isSubmitting || !isValid
          }>
          다음으로
        </Button>
      </form>
    </FormWrapper>
  );
}
