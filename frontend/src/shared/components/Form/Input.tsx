import { ComponentPropsWithoutRef } from "react";

type InputProps = ComponentPropsWithoutRef<"input"> & {
  className?: string;
};

export default function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={`h-[40px] text-neutral-4 font-semibold border-b-1 border-netural-4 focus:border-b-primary focus:outline-none ${
        className ?? "w-[336px]"
      }`}
      {...props}
    />
  );
}
