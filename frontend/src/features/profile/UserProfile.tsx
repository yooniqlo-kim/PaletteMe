import RoundedButton from "@/shared/components/buttons/RoundedButton";
import IconCamera from "@/shared/components/icons/IconCamera";
import UserImage from "@/shared/components/user/UserImage";
import { useNavigate } from "react-router";

type UserProfileProps = {
  nickname: string;
  image?: string;
};

export default function UserProfile({ nickname, image }: UserProfileProps) {
  const navigate = useNavigate();

  return (
    <article className="flex justify-between items-center">
      <span>
        <h2 className="text-lg font-bold">{nickname}</h2>
        <p className="text-sm font-medium">어떤 작품을 디깅하고 계신가요?</p>
      </span>
      <span className="relative" onClick={() => navigate("update-profile")}>
        <UserImage userImg={image} />
        <span className="absolute bottom-0">
          <RoundedButton identifier="user">
            <IconCamera />
          </RoundedButton>
        </span>
      </span>
    </article>
  );
}
