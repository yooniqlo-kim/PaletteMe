import { ComponentPropsWithoutRef } from "react";

type WhiteButtonProps = ComponentPropsWithoutRef<"button"> & {
  isClicked: boolean;
  text: string;
};

// 마이뮤지엄 용 버튼
export default function WhiteButton({
  isClicked,
  text,
  ...props
}: WhiteButtonProps) {
  let style = isClicked
    ? "bg-black text-white"
    : "bg-white text-black border border-netural-3";

  if (text.length === 2) style += " w-15";
  else if (text.length === 4) style += " w-24";

  return (
    <button
      className={`rounded-sm ${style} h-10 text-xs font-semibold cursor-pointer`}
      {...props}>
      {text}
    </button>
  );
}
