import IconSmallRigthArrow from "@/shared/components/icons/IconSmallRigthArrow";

type MenuItemProps = {
  name: string;
};
export default function MenuItem({ name }: MenuItemProps) {
  return (
    <li className="flex justify-between px-2 py-4 box-border items-center rounded-ps border border-neutral-6 text-neutral-6 cursor-pointer">
      <p>{name}</p>
      <IconSmallRigthArrow />
    </li>
  );
}
