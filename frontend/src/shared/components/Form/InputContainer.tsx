import { ReactNode } from "react";

type InputContainerProps = {
  children: ReactNode;
};
export default function InputContainer({ children }: InputContainerProps) {
  return <div className="w-full flex flex-col gap-2">{children}</div>;
}
