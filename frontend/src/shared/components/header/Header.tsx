import IconBack from "../icons/IconBack";
export default function Header() {
  return (
    <header className="h-[56px] flex items-center justify-between px-4">
      <button className="w-[42px] h-[42px] flex items-center justify-center">
        <IconBack />
      </button>

      <h1 className="text-base font-semibold text-center flex-1">
        PaletteMe
      </h1>

      <div className="w-[42px]" />
    </header>
  );
}
