import { ComponentPropsWithoutRef } from "react";

type IdentifierType =
  | "heart"
  | "bookmark"
  | "review_card"
  | "review_detail"
  | "review_list";

type IconButtonProps = ComponentPropsWithoutRef<"button"> & {
  identifier: IdentifierType;
};

export default function IconButton({
  identifier,
  children,
  className = "",
  ...props
}: IconButtonProps) {
  let restProperties = "";

  if (identifier === "heart")
    restProperties =
      "bg-neutral-2 text-black w-15 p-2 box-border flex items-center gap-1";
  else if (identifier === "bookmark")
    restProperties = "bg-neutral-2 p-2 box-border flex items-center";
  else if (identifier === "review_card")
    restProperties =
      "text-white bg-neutral-600/60 w-15 p-1 box-border flex items-center gap-2";
  else if (identifier === "review_detail")
    restProperties =
      "text-neutral-8 border border-neutral-4 bg-white w-15 flex justify-center p-1 box-border gap-1";
  else if (identifier === "review_list")
    restProperties = "text-neutral-800 w-15 box-border flex items-center gap-2";

  return (
    <button
      className={`${restProperties} rounded-ps cursor-pointer text-[12px] flex justify-center items-center ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
