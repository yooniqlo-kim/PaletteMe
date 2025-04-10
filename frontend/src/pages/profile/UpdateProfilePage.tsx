import Button from "@/shared/components/buttons/Button";
import Input from "@/shared/components/form/Input";
import InputContainer from "@/shared/components/form/InputContainer";
import Label from "@/shared/components/form/Label";
import defaultImg from "@/assets/images/MainLogo.png";
import { FormEvent, useEffect, useRef, useState } from "react";
import RoundedButton from "@/shared/components/buttons/RoundedButton";
import IconCamera from "@/shared/components/icons/IconCamera";
import UserImage from "@/shared/components/user/UserImage";
import { useForm } from "react-hook-form";
import useToast from "@/shared/hooks/useToast";
import { checkNickname } from "@/shared/api/register";
import useProfile from "../../features/profile/hooks/useProfile";
import { useQuery } from "@tanstack/react-query";

type FormValues = {
  image: FileList;
  nickname: string;
};

const MAX_IMAGE_SIZE_MB = 5;

export default function RegisterImagePage() {
  const { updateUserInfo, getProfile } = useProfile();
  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormValues>({ mode: "onChange" });

  const [imagePreview, setImagePreview] = useState<string | undefined>(
    data?.userImageUrl
  );
  const [nicknameMsg, setNicknameMsg] = useState<string>();
  const [isNicknameValid, setIsNicknameValid] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isImageValid, setIsImageValid] = useState<boolean>(true);

  const { showToast } = useToast();

  const imageRegister = register("image", {
    onChange: (e) => {
      const file = e.target.files?.[0];
      if (file) {
        const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
        const maxSize = MAX_IMAGE_SIZE_MB * 1024 * 1024;

        if (!allowedTypes.includes(file.type)) {
          showToast({
            message: "JPG 또는 PNG 파일만 업로드 가능합니다.",
            type: "error",
          });
          setIsImageValid(false);
          setImagePreview(undefined);
          return;
        }

        if (file.size > maxSize) {
          showToast({
            message: `이미지 용량은 ${MAX_IMAGE_SIZE_MB}MB 이하로 업로드해주세요.`,
            type: "error",
          });
          setIsImageValid(false);
          setImagePreview(defaultImg);
          return;
        }

        const objectUrl = URL.createObjectURL(file);
        setImagePreview(objectUrl);
        setIsImageValid(true);
      } else {
        setIsImageValid(true);
      }
    },
  });

  const watchNickname = watch("nickname");
  const watchImage = watch("image");
  const isImageSelected = watchImage && watchImage.length > 0;

  useEffect(() => {
    if (data?.nickname) {
      setValue("nickname", data.nickname);
    }
    if (data?.userImageUrl) {
      setImagePreview(data.userImageUrl);
    }
  }, [data, setValue]);

  function handleButtonClick(event: FormEvent) {
    event.preventDefault();
    fileInputRef.current?.click();
  }

  async function handleCheckNickname() {
    const isValid = await trigger("nickname");
    if (!isValid) return;

    try {
      const response = await checkNickname({ nickname: watchNickname });
      const { success, errorMsg } = response.data;
      setNicknameMsg(success ? "유효한 닉네임입니다." : errorMsg);
      setIsNicknameValid(success);
    } catch (error) {
      showToast({
        message: "닉네임 중복 체크 중 오류가 발생했습니다.",
        type: "error",
      });
    }
  }

  function onSubmit(data: FormValues) {
    updateUserInfo(data);
  }

  const isNicknameChanged = watchNickname !== data?.nickname;

  const isSubmitDisabled =
    !isImageValid ||
    (isNicknameChanged && !isNicknameValid) ||
    !isValid ||
    isSubmitting ||
    (!isNicknameChanged && !isImageSelected);

  return (
    <section className="flex px-7">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-8 w-full">
        <h2 className="text-lg font-semibold">프로필</h2>
        <Label htmlFor="image">
          <span className="relative">
            <UserImage userImg={imagePreview || defaultImg} />
            <span className="absolute bottom-0 left-20 z-10">
              <RoundedButton identifier="user" onClick={handleButtonClick}>
                <IconCamera />
              </RoundedButton>
            </span>
          </span>
        </Label>
        <input
          id="image"
          type="file"
          accept="image/*"
          className="hidden"
          {...imageRegister}
          ref={(e) => {
            imageRegister.ref(e);
            fileInputRef.current = e;
          }}
        />
        <InputContainer>
          <Label htmlFor="nickname">닉네임</Label>
          <span className="flex justify-between w-full gap-4">
            <div className="flex flex-col grow">
              <Input
                {...register("nickname", {
                  required: "닉네임은 필수값입니다.",
                  minLength: {
                    value: 2,
                    message: "닉네임은 2자 이상 입력해야 합니다.",
                  },
                  maxLength: {
                    value: 8,
                    message: "닉네임은 최대 8자까지 가능합니다.",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9가-힣]+$/,
                    message:
                      "영어, 숫자, 한글만 사용할 수 있습니다.(공백 불가)",
                  },
                  validate: () => true,
                })}
                id="nickname"
                type="text"
                placeholder="2자 이상 8자 이하로 입력해주세요"
                fallback={errors.nickname && errors.nickname.message}
              />
              {nicknameMsg && <p className="text-primary">{nicknameMsg}</p>}
            </div>
            <Button size="XS" onClick={handleCheckNickname} type="button">
              중복 확인
            </Button>
          </span>
        </InputContainer>
        <Button size="L" disabled={isSubmitDisabled}>
          수정하기
        </Button>
      </form>
    </section>
  );
}
