import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return (
    <div className="flex justify-center items-center w-screen h-screen bg-red-200">
      <div className="w-full max-w-[412px] h-screen bg-white overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
