import RoundedButton from "@/shared/components/Buttons/RoundedButton";
import IconCamera from "@/shared/components/icons/IconCamera";
import UserImage from "@/shared/components/user/UserImage";

export default function UserProfile() {
  return (
    <article className="flex justify-between items-center">
      <span>
        <h2 className="text-lg font-bold">모네덕후</h2>
        <p className="text-sm font-medium">어떤 작품을 디깅하고 계신가요?</p>
      </span>
      <span className="relative">
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
