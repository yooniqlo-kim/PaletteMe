import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "@/shared/components/search/SearchBar";
import PopularKeywordsList from "@/shared/components/search/PopularKeywordsList";

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  setValue: (value: string) => void;
}

export default function SearchContainer({ value, onChange, onKeyDown, setValue }: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null); // ✅ ref 생성
  const navigate = useNavigate();

  const handleKeywordClick = (keyword: string) => {
    setValue(keyword);
    navigate(`/search?query=${encodeURIComponent(keyword)}`);
    inputRef.current?.blur();           // ✅ 포커스 해제
    setIsFocused(false);                // ✅ 포커스 상태 해제
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      navigate(`/search?query=${encodeURIComponent(value.trim())}`);
      inputRef.current?.blur();         // ✅ 포커스 해제
      setIsFocused(false);              // ✅ 포커스 상태 해제
    }
    onKeyDown?.(e); // 부모 핸들러도 실행
  };

  return (
    <div className="relative">
      <SearchBar
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown} // ✅ 우리가 만든 핸들러 사용
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 100)}
        inputRef={inputRef}       // ✅ input에 ref 연결
      />

      {isFocused && (
        <div className="absolute top-full left-0 w-full mt-2 z-[999]">
          <div className="border border-[var(--color-neutral-6)] bg-white shadow-[0px_4px_4px_4px_rgba(34,34,34,0.3)] rounded-[var(--radius-ps)] px-6 pt-5 pb-9">
            <PopularKeywordsList onKeywordClick={handleKeywordClick} />
          </div>
        </div>
      )}
    </div>
  );
}
