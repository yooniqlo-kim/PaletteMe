// Header.tsx
import { useNavigate } from "react-router-dom";
import IconBack from "../icons/IconBack";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[25.75rem] h-[3.5rem] flex items-center justify-between bg-white z-50">
      <button
        onClick={() => navigate(-1)}
        className="w-[2.625rem] h-[2.625rem] flex items-center justify-center"
      >
        <IconBack />
      </button>

      <h1 className="text-base font-semibold text-center flex-1">
        PaletteMe
      </h1>

      <div className="w-[2.625rem]" />
    </header>
  );
}
