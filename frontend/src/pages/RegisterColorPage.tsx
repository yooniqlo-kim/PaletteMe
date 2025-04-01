import Button from "@/shared/components/buttons/Button";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { updateField } from "@/store/formSlice";
import { COLOR } from "@/shared/utils/color";
import ColorCard from "@/features/register/ColorCard";
import FormWrapper from "@/shared/components/form/FormWrapper";
import { useNavigate } from "react-router";

export default function RegisterColorPage() {
  const dispatch = useDispatch();
  const colorItems = COLOR;
  const [selectedColor, setSelectedColor] = useState<string[]>([]);
  const navigate = useNavigate();

  function handleSelectColor(name: string) {
    setSelectedColor((prev) =>
      selectedColor.includes(name)
        ? selectedColor.filter((color) => color !== name)
        : [...prev, name]
    );
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(selectedColor);
    dispatch(
      updateField({
        color: selectedColor,
      })
    );
    navigate("/signup/complete");
  }

  return (
    <FormWrapper>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-8 w-full">
        <h2 className="text-lg font-semibold">
          좋아하는 색을 3개 선택해주세요
        </h2>
        <ul className="grid grid-cols-2 gap-4">
          {colorItems.map((item) => (
            <ColorCard
              key={item.name}
              name={item.name}
              color={item.color}
              onClick={() => handleSelectColor(item.name)}
              isClicked={selectedColor.includes(item.name)}
            />
          ))}
        </ul>
        <Button size="L">다음으로</Button>
      </form>
    </FormWrapper>
  );
}
