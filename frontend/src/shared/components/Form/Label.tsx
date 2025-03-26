import { ComponentPropsWithoutRef } from "react";

type LabelProps = ComponentPropsWithoutRef<"label"> & {
  children: string;
};

export default function Label({ children, ...props }: LabelProps) {
  return (
    <label className="font-semibold text-black" {...props}>
      {children}
    </label>
  );
}
