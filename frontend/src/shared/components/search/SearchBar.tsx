import IconSearch from "@/shared/components/icons/IconSearch";
import { ChangeEvent, KeyboardEvent } from "react";

interface SearchBarProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: KeyboardEvent) => void; // 옵셔널로 변경
  placeholder?: string;
}

export const SearchBar = ({ value, onChange, onKeyDown, placeholder }: SearchBarProps) => {
  return (
    <div
      className="w-[23.75rem] h-[3.25rem] flex items-center px-4 border border-transparent focus-border-primary transition-colors duration-150"
      style={{
        backgroundColor: "var(--color-neutral-2)",
        borderRadius: "0.5rem",
      }}
    >
      <div className="w-[1.75rem] h-[1.75rem] mr-2 flex items-center justify-center flex-shrink-0">
        <IconSearch isActive={false} />
      </div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown} // onKeyDown을 전달
        placeholder={placeholder || "작품, 화가 등 검색하기"}
        className="flex-1 bg-transparent outline-none text-base text-gray-800 placeholder:text-[var(--color-neutral-6)]"
      />
    </div>
  );
};
