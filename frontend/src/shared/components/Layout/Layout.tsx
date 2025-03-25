import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="w-full max-w-[412px] h-screen bg-white overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
