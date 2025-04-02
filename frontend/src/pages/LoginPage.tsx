import { useAuth } from "@/features/auth/useAuth";
import Button from "@/shared/components/buttons/Button";
import Input from "@/shared/components/form/Input";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

type LoginFormValues = {
  id: string;
  password: string;
};

export default function LoginPage() {
  const { handleLogin } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginFormValues>({ mode: "onChange" });

  return (
    <div className="flex justify-center items-center h-full">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="w-70 flex flex-col justify-center items-center gap-16">
        <h2 className="font-extrabold text-lg text-primary">PaletteMe</h2>
        <div className="w-full flex flex-col gap-10">
          <Input
            {...register("id", { required: "아이디는 필수값입니다." })}
            id="id"
            type="text"
            placeholder="아이디"
            fallback={errors.id && errors.id.message}
          />
          <Input
            {...register("password", { required: "비밀번호는 필수값입니다." })}
            id="password"
            type="password"
            placeholder="비밀번호"
            fallback={errors.password && errors.password.message}
          />

          <Button size="L" type="submit" disabled={isSubmitting || !isValid}>
            로그인
          </Button>
        </div>

        <div className="flex flex-col justify-center items-center gap-4 text-sm font-semibold">
          <Link to="/register" className="text-primary">
            회원 가입
          </Link>
          <Link to="/" className="text-neutral-6">
            홈으로 가기
          </Link>
        </div>
      </form>
    </div>
  );
}
