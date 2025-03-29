import { FormEvent } from "react";
import Button from "../Buttons/Button";
import { useNavigate } from "react-router";
import mainLogo from "@/assets/images/MainLogo.png";

type CompletedFormProps = {
  msg: string;
  btnMsg: string;
  route: string;
};
export default function CompletedForm({
  msg,
  btnMsg,
  route,
}: CompletedFormProps) {
  const navigate = useNavigate();
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    navigate(route);
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-8 w-full justify-between h-150"
    >
      <div className=""></div>
      <div className="flex flex-col items-center justify-center gap-2">
        <img src={mainLogo} alt="main logo" className="w-[110px] h-[110px]" />
        <p className="font-semibold text-md">{msg}</p>
      </div>

      <Button size="L">{btnMsg}</Button>
    </form>
  );
}
