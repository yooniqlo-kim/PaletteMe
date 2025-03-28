import { COLOR } from "@/shared/utils/color";
import ColorCard from "./ColorCard";

export default function ColorCardList() {
  const colorItems = COLOR;

  return (
    <ul className="grid grid-cols-2 gap-4">
      {colorItems.map((item) => (
        <ColorCard key={item.name} name={item.name} color={item.color} />
      ))}
    </ul>
  );
}
