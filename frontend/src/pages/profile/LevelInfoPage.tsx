import LevelItemList from "@/features/profile/LevelItemList";
import Button from "@/shared/components/buttons/Button";
import { useNavigate } from "react-router";

export default function LevelInfoPage() {
  const navigate = useNavigate();
  return (
    <section className="flex flex-col px-3 gap-10">
      <div>
        <h2 className="text-lg font-semibold">회원등급</h2>
        <p className="text-neutral-8 font-semibold text-sm">
          모든 빛을 흡수하는 반타블랙에 도전해보세요!
        </p>
      </div>
      <LevelItemList />
      <Button size="XL" onClick={() => navigate("/profile")}>
        이전으로 돌아가기
      </Button>
    </section>
  );
}
