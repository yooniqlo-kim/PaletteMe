import Button from "@/shared/components/Buttons/Button";
import ColorCardList from "./ColorCardList";
import { FormEvent } from "react";

type RegisterColorFormProps = {
  setStage: (stageNum: number) => void;
};

export default function RegisterColorForm({
  setStage,
}: RegisterColorFormProps) {
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setStage(5);
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-8 w-full"
    >
      <h2 className="text-lg font-semibold">좋아하는 색을 선택해주세요</h2>
      <ColorCardList />
      <Button size="L">다음으로</Button>
    </form>
  );
}
