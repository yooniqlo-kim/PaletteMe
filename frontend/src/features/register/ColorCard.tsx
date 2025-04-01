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
  return (
    <li
      className={`flex justify-center items-center w-[8rem] h-[6rem] rounded-pm text-white border border-neutral-3 cursor-pointer`}
      onClick={onClick}
      style={{ backgroundColor: color }}>
      <span className={`${isClicked ? "" : "hidden"}`}>
        <IconSmallCheck />
      </span>
      {name}
    </li>
  );
}
