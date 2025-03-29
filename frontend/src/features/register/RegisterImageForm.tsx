import Button from "@/shared/components/Buttons/Button";
import Input from "@/shared/components/Form/Input";
import InputContainer from "@/shared/components/Form/InputContainer";
import Label from "@/shared/components/Form/Label";
import defaultImg from "@/assets/images/MainLogo.png";
import { ChangeEvent, FormEvent, useState } from "react";
import RoundedButton from "@/shared/components/Buttons/RoundedButton";
import IconCamera from "@/shared/components/icons/IconCamera";
import UserImage from "@/shared/components/user/UserImage";

type RegisterImageFormProps = {
  setStage: (stageNum: number) => void;
};

export default function RegisterImageForm({
  setStage,
}: RegisterImageFormProps) {
  const [image, setImage] = useState<string>(defaultImg);

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  function handleButtonClick(event: FormEvent) {
    event.preventDefault();
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setStage(3);
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-8 w-full"
    >
      <h2 className="text-lg font-semibold">프로필 설정</h2>
      <Label htmlFor="fileInput">
        <span className="relative">
          <UserImage userImg={image} />
          <span className="absolute bottom-0 left-20 z-10">
            <RoundedButton identifier="user" onClick={handleButtonClick}>
              <IconCamera />
            </RoundedButton>
          </span>
        </span>
      </Label>
      <Input
        id="fileInput"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
      <InputContainer>
        <Label htmlFor="nickname">닉네임</Label>
        <span className="flex justify-between w-full gap-4">
          <Input
            id="nickname"
            name="nickname"
            type="text"
            placeholder="홍길동"
          />

          <Button size="XS">중복 확인</Button>
        </span>
      </InputContainer>
      <Button size="L">다음으로</Button>
    </form>
  );
}
