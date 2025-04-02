import Button from "@/shared/components/buttons/Button";
import Form from "@/shared/components/form/Form";
import Input from "@/shared/components/form/Input";
import { useNavigate } from "react-router";

export default function ConfirmPasswordPage() {
  const navigate = useNavigate();

  function checkPassword(data: unknown) {
    const extractedData = data as { password: string };
    console.log(extractedData);

    navigate("/profile/update");
  }

  return (
    <div className="px-7">
      <h2 className="text-lg font-semibold">회원 정보 수정</h2>
      <div
        className="flex justify-center items-center"
        style={{ minHeight: "calc(100vh - 180px)" }}
      >
        <Form
          onSave={checkPassword}
          className="flex flex-col gap-10 justify-center items-center w-full"
        >
          <h2 className="text-lg font-semibold">회원정보 확인</h2>
          <p className="text-sm font-normal">비밀번호를 입력해주세요</p>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="비밀번호"
          />
          <Button size="L">수정하기</Button>
        </Form>
      </div>
    </div>
  );
}
