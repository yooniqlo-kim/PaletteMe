import { useFormDispatch } from "@/store/hooks";
import Button from "@/shared/components/buttons/Button";
import FormWrapper from "@/shared/components/form/FormWrapper";
import Input from "@/shared/components/form/Input";
import InputContainer from "@/shared/components/form/InputContainer";
import Label from "@/shared/components/form/Label";
import { updateField } from "@/store/formSlice";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import {
  checkId,
  sendVerificationCode,
  verifyCode,
} from "@/shared/api/register";
import { useState } from "react";
import useToast from "@/shared/hooks/useToast";
import { passwordValidation } from "@/shared/utils/verifyPassword";
import { useMutation } from "@tanstack/react-query";

type FormValues = {
  id: string;
  password: string;
  confirmPassword: string;
  name: string;
  birthday: number;
  phoneNumber: string;
  verificationCode: string;
};

export default function RegisterInfoPage() {
  const [isValidId, setIsValidId] = useState(false);
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);
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

  const idCheckMutation = useMutation({
    mutationFn: checkId,
    onSuccess: (response) => {
      const { success, errorMsg } = response.data;
      setIsValidId(success);
      setIdMsg(success ? "유효한 아이디입니다." : errorMsg);
    },
    onError: () => {
      showToast({
        message: "아이디 중복 체크 중 문제가 발생했습니다. 다시 시도해주세요",
        type: "error",
      });
    },
  });

  const sendCodeMutation = useMutation({
    mutationFn: sendVerificationCode,
    onSuccess: (response) => {
      const { success, errorMsg } = response.data;
      setPhoneMsg(success ? "인증번호가 전송되었습니다." : errorMsg);
    },
    onError: () => {
      showToast({
        message: "인증번호 전송 중 문제가 발생했습니다. 다시 시도해주세요",
        type: "error",
      });
    },
  });

  const verifyCodeMutation = useMutation({
    mutationFn: verifyCode,
    onSuccess: (response) => {
      const { success, errorMsg } = response.data;
      setIsValidPhoneNumber(success);
      setCodeMsg(success ? "인증번호가 일치합니다." : errorMsg);
    },
    onError: () => {
      showToast({
        message: "인증번호 인증 중 문제가 발생했습니다. 다시 시도해주세요",
        type: "error",
      });
    },
  });

  const handleIdCheck = async () => {
    const isValidField = await trigger("id");
    if (!isValidField) return;
    idCheckMutation.mutate({ id: watchId });
  };

  const handleSendCode = async () => {
    const isValidField = await trigger("phoneNumber");
    if (!isValidField) return;
    sendCodeMutation.mutate({ phoneNumber: watchPhoneNumber });
  };

  const handleCheckCode = async () => {
    const isValidField = await trigger("verificationCode");
    if (!isValidField) return;
    verifyCodeMutation.mutate({
      phoneNumber: watchPhoneNumber,
      verificationCode: watchVerificationCode,
    });
  };

  const onSubmit = (data: FormValues) => {
    dispatch(
      updateField({
        id: data.id,
        password: data.password,
        name: data.name,
        birthday: data.birthday,
        phoneNumber: data.phoneNumber,
      })
    );
    navigate("/signup/profile");
  };

  return (
    <FormWrapper>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-8 w-full"
      >
        <h2 className="text-lg font-semibold">회원가입</h2>
        <div className="flex flex-col w-full gap-[33px]">
          <InputContainer>
            <Label htmlFor="id">아이디</Label>
            <span className="flex justify-between w-full gap-4">
              <div className="flex flex-col grow">
                <Input
                  {...register("id", {
                    required: "아이디는 필수값입니다.",
                    pattern: {
                      value: /^(?!\d+$)[A-Za-z0-9]+$/,
                      message: "영문자 또는 영문자+숫자 조합만 가능합니다.",
                    },
                    maxLength: {
                      value: 20,
                      message: "ID는 20자 이하로 입력해주세요.",
                    },
                  })}
                  id="id"
                  type="text"
                  placeholder="아이디를 입력해주세요"
                  fallback={errors.id?.message}
                />
                {idMsg && <p className="text-primary">{idMsg}</p>}
              </div>
              <Button
                size="XS"
                type="button"
                onClick={handleIdCheck}
                disabled={idCheckMutation.isPending}
              >
                {idCheckMutation.isPending ? "확인 중..." : "중복 확인"}
              </Button>
            </span>
          </InputContainer>

          <InputContainer>
            <Label htmlFor="password">비밀번호</Label>
            <Input
              {...register("password", {
                required: "비밀번호는 필수값입니다.",
                validate: passwordValidation,
              })}
              id="password"
              type="password"
              placeholder="비밀번호를 입력해주세요 (8자 이상 16자 이하)"
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
              {...register("name", {
                required: "이름은 필수값입니다.",
                maxLength: {
                  value: 20,
                  message: "이름은 20자 이하로 입력해주세요.",
                },
              })}
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
              placeholder="2000"
            />
          </InputContainer>

          <InputContainer>
            <Label htmlFor="phoneNumber">전화번호</Label>
            <span className="flex justify-between w-full gap-4">
              <div className="flex flex-col grow">
                <Input
                  {...register("phoneNumber", {
                    required: "전화번호는 필수값입니다.",
                    pattern: {
                      value: /^\d{10,11}$/,
                      message: "숫자만 입력하세요 (10~11자리).",
                    },
                  })}
                  id="phoneNumber"
                  type="text"
                  placeholder="전화번호 입력 ( - 제외)"
                  inputMode="numeric"
                  fallback={errors.phoneNumber?.message}
                />
                {phoneMsg && <p className="text-primary">{phoneMsg}</p>}
              </div>
              <Button
                size="XS"
                type="button"
                onClick={handleSendCode}
                disabled={sendCodeMutation.isPending}
              >
                {sendCodeMutation.isPending ? "전송 중..." : "번호 전송"}
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
                    validate: (value) =>
                      value.length === 6 || "인증번호는 6자리입니다.",
                  })}
                  id="verificationCode"
                  type="text"
                  placeholder="인증번호 6자리 입력"
                  fallback={errors.verificationCode?.message}
                />
                {codeMsg && <p className="text-primary">{codeMsg}</p>}
              </div>
              <Button
                size="XS"
                type="button"
                onClick={handleCheckCode}
                disabled={verifyCodeMutation.isPending}
              >
                {verifyCodeMutation.isPending ? "확인 중..." : "확인"}
              </Button>
            </span>
          </InputContainer>
        </div>
        <Button
          size="L"
          disabled={
            !isValidId || !isValidPhoneNumber || isSubmitting || !isValid
          }
        >
          다음으로
        </Button>
      </form>
      <div className="flex flex-col gap-1 items-center mt-4 text-neutral-6">
        <p className="py-2">이미 계정이 있으신가요?</p>
        <Link to="/login">로그인하기</Link>
      </div>
    </FormWrapper>
  );
}
