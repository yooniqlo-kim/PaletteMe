import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  id?: string;
}

export default function Container({ children, id }: ContainerProps) {
  return (
    <div className="flex justify-center items-center w-screen h-screen bg-red-200">
      <div
        id={id}
        className="w-full max-w-[25.75rem] h-screen bg-white overflow-y-auto">
        <div id="modal"></div>
        {children}
      </div>
    </div>
  );
}
