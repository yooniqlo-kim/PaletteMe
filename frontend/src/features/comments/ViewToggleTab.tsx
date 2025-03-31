// ViewToggleTab.tsx
import { LayoutList, GalleryHorizontal } from "lucide-react";

type ViewMode = "list" | "ticket";

export function ViewToggleTab({
  value,
  onChange,
}: {
  value: ViewMode;
  onChange: (v: ViewMode) => void;
}) {
  return (
    <div className="flex items-center gap-2 p-2">
      <button
        onClick={() => onChange("list")}
        className={`p-1 rounded ${value === "list" ? "bg-neutral-200" : ""}`}
      >
        <LayoutList className="w-5 h-5" />
      </button>
      <button
        onClick={() => onChange("ticket")}
        className={`p-1 rounded ${value === "ticket" ? "bg-neutral-200" : ""}`}
      >
        <GalleryHorizontal className="w-5 h-5" />
      </button>
    </div>
  );
}
