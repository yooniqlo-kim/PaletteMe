import { ComponentPropsWithoutRef } from "react";

type ColorCard = ComponentPropsWithoutRef<"li"> & {
  name: string;
  color: string;
};
export default function ColorCard({ name, color }: ColorCard) {
  return (
    <li
      className={`flex justify-center items-center w-[8rem] h-[6rem] rounded-pm text-white border border-neutral-3 cursor-pointer`}
      style={{ backgroundColor: color }}>
      {name}
    </li>
  );
}
