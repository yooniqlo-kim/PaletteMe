import { useAuth } from "@/features/auth/useAuth";
import Menu from "@/features/profile/Menu";
import UserMeta from "@/features/profile/UserMeta";
import UserProfile from "@/features/profile/UserProfile";
import { Link } from "react-router";
import level0 from "@/assets/levels/level_0.svg";
import level1 from "@/assets/levels/level_1.svg";
import level2 from "@/assets/levels/level_2.svg";
import level3 from "@/assets/levels/level_3.svg";
import level4 from "@/assets/levels/level_4.svg";
import level5 from "@/assets/levels/level_5.svg";

import { Level } from "./type";
import { useQuery } from "@tanstack/react-query";
import useProfile from "./useProfile";

const levelImages = [level0, level1, level2, level3, level4, level5];

function getLevelImage(level: Level) {
  return levelImages[level];
}

export default function ProfilePage() {
  const { logout } = useAuth();

  const { getProfile } = useProfile();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  let content;

  if (isLoading) {
    content = (
      <p className="text-primary flex justify-center items-center">
        로딩 중입니다....
      </p>
    );
  } else if (!data) {
    content = (
      <p className="text-primary flex justify-center items-center">
        회원 정보를 불러오는 중입니다....
      </p>
    );
  } else if (isError) {
    content = (
      <p className="text-primary flex justify-center items-center">
        회원 정보 조회 중 오류가 발생했습니다.
      </p>
    );
  } else {
    content = (
      <>
        <UserProfile
          nickname={data!.nickname}
          image={data!.userImageUrl}
          level={Number(data!.grade) as Level}
        />
        <UserMeta
          review={data!.reviewCount}
          like={data!.artworkLikeCount}
          loggedIn={data!.attendance}
        />
        <img
          className="w-full h-full"
          src={getLevelImage(Number(data!.grade) as Level)}
          alt="level"
        />
      </>
    );
  }

  return (
    <section className="px-3 py-3 flex flex-col gap-10 box-border">
      {content}
      <Menu />
      <div className="text-inactive font-[0.75rem] flex justify-center gap-1 items-center">
        <button onClick={logout}>로그아웃</button>
        <span>|</span>
        <Link to="delete">회원 탈퇴</Link>
      </div>
    </section>
  );
}
