import { useState, useRef, useEffect, ReactNode } from "react";

type DropdownMenuProps = {
  button: ReactNode;
  options: { label: string; onClick: () => void }[];
};

export default function DropdownMenu({ button, options }: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => setOpen((prev) => !prev);
  const handleOptionClick = (onClick: () => void) => {
    onClick();
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div ref={menuRef} className="relative inline-block text-left">
      <span onClick={handleToggle}>{button}</span>
      {open && (
        <div className="absolute right-0 mt-2 w-24 bg-white border border-neutral-3 rounded-ps shadow-md z-20">
          {options.map((opt) => (
            <button
              key={opt.label}
              onClick={() => handleOptionClick(opt.onClick)}
              className="block w-full px-4 py-2 text-center text-sm hover:bg-neutral-2"
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
