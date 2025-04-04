import { ComponentPropsWithoutRef, ReactNode } from "react";

type LabelProps = ComponentPropsWithoutRef<"label"> & {
  children: ReactNode;
};

export default function Label({ children, ...props }: LabelProps) {
  return (
    <label className="font-semibold text-black" {...props}>
      {children}
    </label>
  );
}
