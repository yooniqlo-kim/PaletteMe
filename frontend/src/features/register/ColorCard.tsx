import IconSmallCheck from "@/shared/components/icons/IconSmallCheck";
import { ComponentPropsWithoutRef } from "react";

type ColorCard = ComponentPropsWithoutRef<"li"> & {
  name: string;
  color: string;
  onClick: () => void;
  isClicked: boolean;
};
export default function ColorCard({
  name,
  color,
  onClick,
  isClicked,
}: ColorCard) {
  let textColor =
    name === "YELLOW" || name === "WHITE" ? "text-black" : "text-white";

  let checkColor = name === "YELLOW" || name === "WHITE" ? "black" : "white";

  let border = name === "WHITE" ? "border-neutral-6" : "border-neutral-3";

  return (
    <li
      className={`flex justify-center items-center w-[8rem] h-[6rem] rounded-pm border ${border} cursor-pointer ${textColor}`}
      onClick={onClick}
      style={{ backgroundColor: color }}>
      <span className={`${isClicked ? "" : "hidden"}`}>
        <IconSmallCheck color={checkColor} />
      </span>
      {name}
    </li>
  );
}
