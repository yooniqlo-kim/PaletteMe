import Button from "@/shared/components/buttons/Button";
import Input from "@/shared/components/form/Input";
import { FormEvent } from "react";
import { useNavigate } from "react-router";

export default function ConfirmPasswordForm() {
  const navigate = useNavigate();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    navigate("/profile/update");
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-10 justify-center items-center w-full">
      <h2 className="text-lg font-semibold">회원정보 확인</h2>
      <p className="text-sm font-normal">비밀번호를 입력해주세요</p>
      <Input
        id="password"
        name="password"
        type="password"
        placeholder="비밀번호"
      />
      <Button size="L">수정하기</Button>
    </form>
  );
}
