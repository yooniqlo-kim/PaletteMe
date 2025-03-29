import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  id?: string;
  hidePadding?: boolean;
}

export default function Container({
  children,
  id = "scrollable-container",
  hidePadding = false,
}: ContainerProps) {
  return (
    <div
      id={id}
      className={`w-full max-w-[25.75rem] h-full bg-white overflow-y-auto ${
        hidePadding ? "" : "pt-[3.5rem] pb-[3.75rem]"
      }`}
    >
      {children}
    </div>
  );
}
