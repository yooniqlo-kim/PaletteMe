import Button from "@/shared/components/Buttons/Button";
import ColorCardList from "./ColorCardList";

export default function RegisterColorForm() {
  return (
    <form className="flex flex-col items-center gap-8 w-full">
      <h2 className="text-lg font-semibold">좋아하는 색을 선택해주세요</h2>
      <ColorCardList />
      <Button size="L">다음으로</Button>
    </form>
  );
}
