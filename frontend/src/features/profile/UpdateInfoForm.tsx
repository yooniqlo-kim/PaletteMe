import Button from "@/shared/components/Buttons/Button";
import Input from "@/shared/components/Form/Input";
import InputContainer from "@/shared/components/Form/InputContainer";
import Label from "@/shared/components/Form/Label";
import { FormEvent } from "react";

export default function UpdateInfoForm() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full">
      <h2 className="text-lg font-semibold">회원정보 수정</h2>
      <div className="flex flex-col w-full gap-[33px]">
        <InputContainer>
          <Label htmlFor="id">아이디</Label>
          <span className="flex justify-between w-full gap-4">
            <Input id="id" name="id" type="text" />
          </span>
        </InputContainer>
        <InputContainer>
          <Label htmlFor="id">새 비밀번호</Label>
          <Input
            id="id"
            name="id"
            type="password"
            placeholder="비밀번호를 입력해주세요 (8자 이상)"
          />
        </InputContainer>
        <InputContainer>
          <Label htmlFor="id">새 비밀번호 확인</Label>
          <Input
            id="id"
            name="id"
            type="password"
            placeholder="새 비밀번호를 다시 입력해주세요"
          />
        </InputContainer>
        <InputContainer>
          <Label htmlFor="id">이름</Label>
          <Input id="id" name="id" type="text" placeholder="홍길동" />
        </InputContainer>
        <InputContainer>
          <Label htmlFor="id">생년월일</Label>
          <Input id="id" name="id" type="date" placeholder="YYMMDD" />
        </InputContainer>
        <InputContainer>
          <Label htmlFor="id">전화번호</Label>
          <span className="flex justify-between w-full gap-4">
            <Input
              id="id"
              name="id"
              type="number"
              placeholder="전화번호 입력 ( - 제외)"
            />
            <Button size="XS">번호 전송</Button>
          </span>
        </InputContainer>
        <InputContainer>
          <Label htmlFor="id">인증번호 입력</Label>
          <span className="flex justify-between w-full gap-4">
            <Input
              id="id"
              name="id"
              type="number"
              placeholder="인증번호 6자리 입력"
            />
            <Button size="XS">확인</Button>
          </span>
        </InputContainer>
      </div>
      <Button size="L">확인</Button>
    </form>
  );
}
