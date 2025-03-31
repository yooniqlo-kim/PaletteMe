import Button from "@/shared/components/buttons/Button";
import RoundedButton from "@/shared/components/buttons/RoundedButton";
import Form from "@/shared/components/form/Form";
import Input from "@/shared/components/form/Input";
import InputContainer from "@/shared/components/form/InputContainer";
import Label from "@/shared/components/form/Label";
import IconCamera from "@/shared/components/icons/IconCamera";
import UserImage from "@/shared/components/user/UserImage";
import { ChangeEvent, FormEvent, useState } from "react";
import defaultImg from "@/assets/images/MainLogo.png";

export default function UpdateProfilePage() {
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

  function updateUserInfo(data: unknown) {}
  return (
    <div className="px-7">
      <Form
        onSave={updateUserInfo}
        className="flex flex-col items-center gap-8 w-full"
      >
        <h2 className="text-lg font-semibold">프로필 업데이트</h2>
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
      </Form>
    </div>
  );
}
