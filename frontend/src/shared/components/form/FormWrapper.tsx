import { ReactNode } from "react";
import SignupProgressBar from "../progressbar/SignupProgressBar";

type FormWrapperProps = {
  children: ReactNode;
};

export default function FormWrapper({ children }: FormWrapperProps) {
  let step = 1;

  const pathName = window.location.pathname;

  if (pathName === "/signup") step = 1;
  else if (pathName === "/signup/profile") step = 2;
  else if (pathName === "/signup/artwork") step = 3;
  else if (pathName === "/signup/color") step = 4;

  return (
    <div className={`flex flex-col w-full ${step === 3 ? "p-5" : "p-8"}`}>
      {step < 5 && <SignupProgressBar currentStep={step} />}
      {children}
    </div>
  );
}
