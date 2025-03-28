import { ComponentPropsWithoutRef } from "react";

type LevelItemProps = ComponentPropsWithoutRef<"li"> & {
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
  const isGradient = level.startsWith("linear-gradient");

  return (
    <li className="h-15 flex justify-between items-center rounded-ps bg-white border border-neutral-6 text-sm px-5 box-border">
      <span
        className="w-10 h-10 rounded-[50%]"
        style={
          isGradient ? { backgroundImage: level } : { backgroundColor: level }
        }></span>
      <span>{review}</span>
      <span>{like}</span>
      <span>{loggedIn}</span>
    </li>
  );
}
