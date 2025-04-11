import { ComponentPropsWithoutRef } from "react";

type InputProps = ComponentPropsWithoutRef<"input"> & {
  fallback?: string;
};

export default function Input({ fallback, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      <input
        className={`text-black placeholder:text-neutral-4 w-full h-[40px] font-semibold border-b-1 border-neutral-4 focus:border-b-primary focus:outline-none 
      }`}
        {...props}
      />
      {fallback && <p className="text-red-500 text-xs">{fallback}</p>}
    </div>
  );
}
