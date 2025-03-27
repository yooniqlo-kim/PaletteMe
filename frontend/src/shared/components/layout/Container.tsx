import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  id?: string;
}

export default function Container({ children, id }: ContainerProps) {
  return (
    <div
      id={id}
      className="w-full max-w-[25.75rem] h-full pt-[56px] pb-[60px] bg-white overflow-y-auto"
    >
      <div id="modal"></div>
      {children}
    </div>
  );
}
