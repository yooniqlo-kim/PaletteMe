// import LoginForm from "@/features/login/LoginForm";
import Button from "@/shared/components/buttons/Button";
import Form from "@/shared/components/form/Form";
import Input from "@/shared/components/form/Input";
import useToast from "@/shared/hooks/useToast";
import { Link } from "react-router";

export default function LoginPage() {
  function handleLogin(data: unknown) {
    const extractedData = data as { id: string; password: string };
    console.log(extractedData);
    const { showToast } = useToast();
    showToast({ message: "로그인 성공", type: "success" });
  }
  return (
    <div className="flex justify-center items-center h-full">
      <Form
        onSave={handleLogin}
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
