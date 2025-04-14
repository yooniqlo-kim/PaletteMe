import Button from "@/shared/components/buttons/Button";
import { FormEvent, useEffect, useState } from "react";
import { updateField } from "@/store/formSlice";
import ColorCard from "@/features/register/ColorCard";
import FormWrapper from "@/shared/components/form/FormWrapper";
import { useNavigate } from "react-router";
import { useFormDispatch } from "@/store/hooks";
// import RedirectOnRefresh from "@/features/register/FormPrompt";

const COLOR = [
  { name: "RED", color: "#FF0000" },
  { name: "ORANGE", color: "#FFA500" },
  { name: "YELLOW", color: "#FFFF00" },
  { name: "GREEN", color: "#008000" },
  { name: "BLUE", color: "#0000FF" },
  { name: "VIOLET", color: "#EE82EE" },
  { name: "BLACK", color: "#000000" },
  { name: "BROWN", color: "#A52A2A" },
  { name: "WHITE", color: "#FFFFFF" },
  { name: "GREY", color: "#808080" },
];

export default function RegisterColorPage() {
  const dispatch = useFormDispatch();
  const colorItems = COLOR;
  const [selectedColor, setSelectedColor] = useState<string[]>([]);
  const [msg, setMsg] = useState<string>();
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedColor.length > 3) {
      setMsg("좋아하는 색은 최대 3개까지 선택할 수 있습니다.");
    } else {
      setMsg("");
    }
  }, [selectedColor.length]);

  function handleSelectColor(name: string) {
    setSelectedColor((prev) =>
      selectedColor.includes(name)
        ? selectedColor.filter((color) => color !== name)
        : [...prev, name]
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch(
      updateField({
        color: [...selectedColor],
      })
    );

    navigate("/signup/complete");
  }

  return (
    <FormWrapper>
      {/* <RedirectOnRefresh /> */}
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
        {msg && <p className="text-primary">{msg}</p>}
        <Button size="L" disabled={selectedColor.length !== 3}>
          다음으로
        </Button>
      </form>
    </FormWrapper>
  );
}
