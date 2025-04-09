import { useEffect, useState } from "react";
import { ArtworkMeta } from "@/shared/components/artworks/ArtworkMeta";
import { KeywordSuggester } from "./KeywordSuggester";
import { TextArea } from "./TextArea";
import { VisibilityToggle } from "./VisibilityToggle";
import Button from "@/shared/components/buttons/Button";
import { ArtworkPreview } from "@/shared/types/artwork";

type WriteFormProps = {
  artwork: ArtworkPreview;
  onDirtyChange?: (isDirty: boolean) => void;
  initialValues?: {
    content: string;
    visibility: "public" | "private";
  };
  onSubmit: (data: {
    content: string;
    visibility: "public" | "private";
  }) => void;
};

export function WriteForm({
  artwork,
  onDirtyChange,
  initialValues,
  onSubmit,
}: WriteFormProps) {
  const [content, setContent] = useState(initialValues?.content ?? "");
  const [visibility, setVisibility] = useState<"public" | "private">(
    initialValues?.visibility ?? "public"
  );

  // 감상문 입력 상태 변경 시 dirty 상태 부모에게 전달
  useEffect(() => {
    onDirtyChange?.(content.trim().length > 0);
  }, [content, onDirtyChange]);

  const handleSubmit = async () => {
    if (!content.trim()) {
      alert("감상문을 작성해주세요.");
      return;
    }
    onSubmit({ content, visibility });
  };

  return (
    <div className="flex flex-col gap-4">
      <ArtworkMeta artwork={artwork} showYear showLocation />
      <KeywordSuggester />
      <TextArea value={content} onChange={(e) => setContent(e.target.value)} />
      <VisibilityToggle value={visibility} onChange={setVisibility} />
      <Button size="XL" onClick={handleSubmit}>
        {initialValues ? "수 정" : "등 록"}
      </Button>
    </div>
  );
}
