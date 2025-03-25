import { ComponentPropsWithoutRef } from "react";

type IdentifierType = "heart" | "bookmark" | "review_card" | "review_detail";

type WhiteButtonProps = ComponentPropsWithoutRef<"button"> & {
  identifier: IdentifierType;
};

export default function WhiteButton({
  identifier,
  children,
  ...props
}: WhiteButtonProps) {
  let restProperties;

  if (identifier === "heart")
    restProperties = "bg-netural-2 text-black w-[60px] p-1 box-border";
  else if (identifier === "bookmark")
    restProperties = "bg-netural-2 p-1 box-border";
  else if (identifier === "review_card")
    restProperties =
      "text-white bg-netural-2 opacity-50 w-[60px] p-1 box-border";
  else if (identifier === "review_detail")
    restProperties =
      "text-netural-8 border border-netural-4 bg-white w-[60px] flex justify-center p-1 box-border gap-1";

  return (
    <button
      className={`${restProperties} rounded-sm cursor-pointer`}
      {...props}>
      {children}
    </button>
  );
}
