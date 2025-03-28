import Menu from "@/features/profile/Menu";
import UserMeta from "@/features/profile/UserMeta";
import UserProfile from "@/features/profile/UserProfile";
import Pallette from "@/shared/components/user/Pallette";

export default function ProfilePage() {
  return (
    <section className="px-3 py-3 flex flex-col gap-6 box-border">
      <UserProfile />
      <UserMeta review={0} like={0} loggedIn={0} />
      <Pallette level="주황" />
      <Menu />
      <div className="text-inactive font-[0.75rem] flex justify-center gap-1 items-center">
        <a href="/">로그아웃</a>
        <span>|</span>
        <a href="/">회원 탈퇴</a>
      </div>
    </section>
  );
}
