import { useState } from "react";
import { ArtworkMeta } from "@/shared/components/artworks/ArtworkMeta";
import { artworkDummy } from "@/shared/dummy/artworkDummy";
import { KeywordSuggester } from "./KeywordSuggester";
import { TextArea } from "./TextArea";
import { VisibilityToggle } from "./VisibilityToggle";
import Button from "@/shared/components/Buttons/Button";

export function WriteForm() {
  const [content, setContent] = useState("");
  const [visibility, setVisibility] = useState<"public" | "private">("private");

  const handleSubmit = async () => {
    if (!content.trim()) {
      alert("감상문을 작성해주세요.");
      return;
    }

    const payload = {
      artworkId: artworkDummy.artworkId,
      content,
      visibility,
    };

    try {
      const res = await fetch("/api/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("등록 실패");

      alert("감상문이 등록되었습니다!");
    } catch (err) {
      console.error(err);
      alert("오류가 발생했습니다.");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <ArtworkMeta artwork={artworkDummy} showYear showLocation />
      <KeywordSuggester />
      <TextArea value={content} onChange={(e) => setContent(e.target.value)} />
      <VisibilityToggle value={visibility} onChange={setVisibility} />
      <Button size="XL" onClick={handleSubmit}>
        등 록
      </Button>
    </div>
  );
}
