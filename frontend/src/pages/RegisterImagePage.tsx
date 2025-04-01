import Button from "@/shared/components/buttons/Button";
import Input from "@/shared/components/form/Input";
import InputContainer from "@/shared/components/form/InputContainer";
import Label from "@/shared/components/form/Label";
import defaultImg from "@/assets/images/MainLogo.png";
import { FormEvent, useEffect, useState } from "react";
import RoundedButton from "@/shared/components/buttons/RoundedButton";
import IconCamera from "@/shared/components/icons/IconCamera";
import UserImage from "@/shared/components/user/UserImage";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { updateField } from "@/store/formSlice";
import FormWrapper from "@/shared/components/form/FormWrapper";
import { useNavigate } from "react-router";

type FormValues = {
  imageUrl: FileList;
  nickname: string;
};

export default function RegisterImagePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();
  const [imagePreview, setImagePreview] = useState<string | null>();

  const image = watch("imageUrl");

  useEffect(() => {
    if (image && image.length > 0) {
      const file = image[0];
      console.log(file);
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [image]);

  function handleButtonClick(event: FormEvent) {
    event.preventDefault();
  }

  function onSubmit(data: FormValues) {
    console.log(data);
    dispatch(
      updateField({
        imageUrl:
          data.imageUrl.length === 0 ? defaultImg : data.imageUrl[0].name,
        nickname: data.nickname,
      })
    );
    navigate("/signup/artwork");
  }
  return (
    <FormWrapper>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-8 w-full">
        <h2 className="text-lg font-semibold">프로필 설정</h2>
        <Label htmlFor="imageUrl">
          <span className="relative">
            <UserImage userImg={imagePreview || defaultImg} />
            <span className="absolute bottom-0 left-20 z-10">
              <RoundedButton identifier="user" onClick={handleButtonClick}>
                <IconCamera />
              </RoundedButton>
            </span>
          </span>
        </Label>
        <Input
          {...register("imageUrl")}
          id="imageUrl"
          type="file"
          accept="image/*"
          className="hidden"
        />
        <InputContainer>
          <Label htmlFor="nickname">닉네임</Label>
          <span className="flex justify-between w-full gap-4">
            <Input
              {...register("nickname", { required: "닉네임은 필수값입니다." })}
              id="nickname"
              type="text"
              placeholder="홍길동"
              fallback={errors.nickname && errors.nickname.message}
            />

            <Button size="XS">중복 확인</Button>
          </span>
        </InputContainer>
        <Button size="L">다음으로</Button>
      </form>
    </FormWrapper>
  );
}
