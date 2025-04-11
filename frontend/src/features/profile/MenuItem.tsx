import IconSmallRigthArrow from "@/shared/components/icons/IconSmallRigthArrow";
import { ComponentPropsWithoutRef } from "react";

type MenuItemProps = ComponentPropsWithoutRef<"li"> & {
  name: string;
};

export default function MenuItem({ name, onClick }: MenuItemProps) {
  return (
    <li
      onClick={onClick}
      className="flex justify-between px-2 py-4 box-border items-center rounded-ps border border-neutral-3 text-neutral-7 cursor-pointer">
      <p>{name}</p>
      <IconSmallRigthArrow />
    </li>
  );
}
