import { ComponentPropsWithoutRef } from "react";

type IdentifierType = "heart" | "bookmark" | "review_card" | "review_detail";

type IconButtonProps = ComponentPropsWithoutRef<"button"> & {
  identifier: IdentifierType;
};

export default function IconButton({
  identifier,
  children,
  ...props
}: IconButtonProps) {
  let restProperties;

  if (identifier === "heart")
    restProperties = "bg-netural-2 text-black w-15 p-1 box-border";
  else if (identifier === "bookmark")
    restProperties = "bg-netural-2 p-1 box-border";
  else if (identifier === "review_card")
    restProperties = "text-white bg-netural-2 opacity-50 w-15 p-1 box-border";
  else if (identifier === "review_detail")
    restProperties =
      "text-netural-8 border border-netural-4 bg-white w-15 flex justify-center p-1 box-border gap-1";

  return (
    <button
      className={`${restProperties} rounded-sm cursor-pointer text-[12px] flex justify-center items-center`}
      {...props}>
      {children}
    </button>
  );
}
