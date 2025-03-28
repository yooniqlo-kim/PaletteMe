import { useState } from "react";
import { Lock } from "lucide-react";

export function VisibilityToggle() {
  const [value, setValue] = useState<"public" | "private">("private");

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-1 text-sm font-medium">
        <Lock className="w-4 h-4 text-primary" strokeWidth={2.5} />
        공개 설정
      </div>

      <div className="flex gap-4 ml-5">
        {[
          { value: "public", label: "공개" },
          { value: "private", label: "비공개" },
        ].map((option) => {
          const selected = value === option.value;

          return (
            <label
              key={option.value}
              className="flex items-center gap-1 cursor-pointer"
            >
              <span
                className={`relative w-4 h-4 rounded-full border-2 
                  flex items-center justify-center
                  ${
                    selected
                      ? "border-primary bg-white"
                      : "border-neutral-300 bg-white"
                  }`}
              >
                {selected && (
                  <span className="w-2 h-2 rounded-full bg-primary" />
                )}
              </span>

              <input
                type="radio"
                name="visibility"
                value={option.value}
                checked={selected}
                onChange={() => setValue(option.value as "public" | "private")}
                className="hidden"
              />

              <span
                className={`text-xs ${
                  selected ? "text-primary font-semibold" : "text-neutral-400"
                }`}
              >
                {option.label}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
