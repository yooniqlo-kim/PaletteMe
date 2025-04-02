import { useAuth } from "@/features/auth/useAuth";
import Button from "@/shared/components/buttons/Button";
import Form from "@/shared/components/form/Form";
import Input from "@/shared/components/form/Input";
import { Link } from "react-router";

export default function LoginPage() {
  const { handleLogin } = useAuth();

  return (
    <div className="flex justify-center items-center h-full">
      <Form
        onSave={(data) => handleLogin(data as { id: string; password: string })}
        className="w-70 flex flex-col justify-center items-center gap-16">
        <h2 className="font-extrabold text-lg text-primary">PaletteMe</h2>
        <div className="w-full flex flex-col gap-10">
          <Input id="id" name="id" type="text" placeholder="아이디" />
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="비밀번호"
          />
          <Button size="L" type="submit">
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
      </Form>
    </div>
  );
}
