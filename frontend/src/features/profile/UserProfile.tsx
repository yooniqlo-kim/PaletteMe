import RoundedButton from "@/shared/components/buttons/RoundedButton";
import IconCamera from "@/shared/components/icons/IconCamera";
import UserImage from "@/shared/components/user/UserImage";
import { useNavigate } from "react-router";

import level1Img from "@/assets/levels/level-icon-1.svg";
import level2Img from "@/assets/levels/level-icon-2.svg";
import level3Img from "@/assets/levels/level-icon-3.svg";
import level4Img from "@/assets/levels/level-icon-4.svg";
import level5Img from "@/assets/levels/level-icon-5.svg";
import { Level } from "@/features/register/type/type";

type UserProfileProps = {
  nickname: string;
  image?: string;
  level: Level;
};

const levelIcons = [level1Img, level2Img, level3Img, level4Img, level5Img];
const levelInfo = ["쇼킹핑크", "호크니", "모네", "플루이드 핑크", "반타 블랙"];
const colorClasses = ["#FF385C", "#38CAFF", "#A9169B", "#FF7B84", "#000000"];

function getLevelInfo(level: Level) {
  return levelInfo[level - 1];
}

function getLevelIcon(level: Level) {
  return levelIcons[level - 1];
}

export default function UserProfile({
  nickname,
  image,
  level,
}: UserProfileProps) {
  const navigate = useNavigate();

  return (
    <article className="flex justify-between items-center">
      <span className="flex flex-col gap-8">
        <h2 className="text-lg font-bold">{nickname}</h2>
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium">
            현재 등급 :{" "}
            <strong style={{ color: colorClasses[level - 1] }}>
              {getLevelInfo(level)}
            </strong>
          </p>
          <img src={getLevelIcon(level)} width={30} height={50} />
        </div>
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
