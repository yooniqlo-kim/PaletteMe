import RoundedButton from "@/shared/components/buttons/RoundedButton";
import IconCamera from "@/shared/components/icons/IconCamera";
import UserImage from "@/shared/components/user/UserImage";
import { useNavigate } from "react-router";

export default function UserProfile() {
  const navigate = useNavigate();

  return (
    <article className="flex justify-between items-center">
      <span>
        <h2 className="text-lg font-bold">모네덕후</h2>
        <p className="text-sm font-medium">어떤 작품을 디깅하고 계신가요?</p>
      </span>
      <span className="relative" onClick={() => navigate("update-profile")}>
        <UserImage />
        <span className="absolute bottom-0">
          <RoundedButton identifier="user">
            <IconCamera />
          </RoundedButton>
        </span>
      </span>
    </article>
  );
}
