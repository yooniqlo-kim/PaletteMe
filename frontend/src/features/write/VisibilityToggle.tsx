import { Lock } from "lucide-react";
type Visibility = "public" | "private";

type Props = {
  value: Visibility;
  onChange: (value: Visibility) => void;
};

export function VisibilityToggle({ value, onChange }: Props) {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-1 text-sm font-medium">
        <Lock
          className="w-4 h-4 text-primary"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
        />
        공개 설정
      </div>

      <div className="flex gap-4 ml-5">
        {["public", "private"].map((option) => {
          const selected = value === option;
          return (
            <label
              key={option}
              className="flex items-center gap-1 cursor-pointer"
            >
              <span
                className={`relative w-4 h-4 rounded-full border-2 flex items-center justify-center ${
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
                value={option}
                checked={selected}
                onChange={() => onChange(option as Visibility)}
                className="hidden"
              />
              <span
                className={`text-xs ${
                  selected ? "text-primary font-semibold" : "text-neutral-400"
                }`}
              >
                {option === "public" ? "공개" : "비공개"}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
