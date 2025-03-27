import { ComponentPropsWithoutRef } from "react";

type InputProps = ComponentPropsWithoutRef<"input">;

export default function Input({ ...props }: InputProps) {
  return (
    <input
      className={`text-neutral-4 grow h-[40px] font-semibold border-b-1 border-netural-4 focus:border-b-primary focus:outline-none 
      }`}
      {...props}
    />
  );
}
