import Button from "@/shared/components/buttons/Button";
import Input from "@/shared/components/form/Input";
import { useForm } from "react-hook-form";
import useVerifyPassword from "@/features/profile/hooks/useVerifyPassword";
import LoadingDots from "@/shared/components/loading/LoadingDots";

type FormData = {
  password: string;
};

export default function ConfirmPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormData>({ mode: "onChange" });

  const { verifyPassword, isPending } = useVerifyPassword();

  function checkPassword(data: FormData) {
    const { password } = data;
    verifyPassword(password);
  }

  return (
    <div className="px-10">
      <div
        className="flex justify-center items-center"
        style={{ minHeight: "calc(100vh - 180px)" }}
      >
        <form
          onSubmit={handleSubmit(checkPassword)}
          className="flex flex-col gap-10 justify-center items-center w-full"
        >
          <h2 className="text-lg font-semibold">회원정보 확인</h2>
          <p className="text-sm font-normal">비밀번호를 입력해주세요</p>
          <div className="w-full">
            <Input
              {...register("password", {
                required: "비밀번호는 필수값입니다.",
              })}
              id="password"
              type="password"
              placeholder="비밀번호"
              fallback={errors.password?.message}
            />
          </div>

          <Button size="L" disabled={!isValid || isSubmitting}>
            {isPending ? <LoadingDots /> : "확인하기"}
          </Button>
        </form>
      </div>
    </div>
  );
}
