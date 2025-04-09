import { ComponentPropsWithoutRef } from "react";

type LevelItemProps = ComponentPropsWithoutRef<"tr"> & {
  level: string;
  review: string;
  like: string;
  loggedIn: string;
};

export default function LevelItem({
  level,
  review,
  like,
  loggedIn,
}: LevelItemProps) {
  return (
    <tr className="h-15 flex justify-between items-center rounded-ps bg-white border border-neutral-6 text-sm px-5 box-border">
      <td>
        <img src={level} alt="level" loading="lazy" className="w-8 h-8" />
      </td>
      <td>{review}</td>
      <td>{like}</td>
      <td>{loggedIn}</td>
    </tr>
  );
}
