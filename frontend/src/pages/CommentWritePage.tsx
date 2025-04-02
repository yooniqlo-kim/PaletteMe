import { useParams } from "react-router";
import { useState, useCallback } from "react";
import { ArtworkImage } from "@/features/detail/ArtworkImage";
import { WhiteContainer } from "@/shared/components/textbox/WhiteRoundedContainer";
import { baseArtworkDummy } from "@/shared/dummy/artworkDummy";
import { WriteForm } from "@/features/write/WriteForm";
import Modal from "@/shared/components/modal/Modal";
import { useBlocker } from "react-router";

export default function WritePage() {
  const [isDirty, setIsDirty] = useState(false);
  const handleDirtyChange = useCallback((dirty: boolean) => {
    setIsDirty(dirty);
  }, []);

  const { state, reset, proceed } = useBlocker(isDirty);
  const { artworkId } = useParams<{ artworkId: string }>();
  const artwork = baseArtworkDummy.find((a) => a.artworkId === artworkId);

  if (!artwork) return <div>작품 정보를 불러올 수 없습니다.</div>;

  const handleSubmit = async ({
    content,
    visibility,
  }: {
    content: string;
    visibility: "public" | "private";
  }) => {
    try {
      const res = await fetch("/api/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          artworkId: artwork.artworkId,
          content,
          visibility,
        }),
      });

      if (!res.ok) throw new Error("등록 실패");

      alert("감상문이 등록되었습니다!");
      // 페이지 이동 추가해야 함
    } catch (err) {
      console.error(err);
      alert("오류가 발생했습니다.");
    }
  };

  return (
    <div className="bg-neutral-100 min-h-screen">
      {state === "blocked" && (
        <Modal
          open
          msg="작성 중인 감상문이 사라져요"
          confirmMsg="정말 나가시겠습니까?"
          onClose={reset} // 아니오
          onConfirm={proceed} // 네
        />
      )}

      <div className="bg-neutral-200 pt-2">
        <ArtworkImage artwork={artwork} />
      </div>

      <WhiteContainer withTopRound withMarginTop>
        <WriteForm
          artwork={artwork}
          onDirtyChange={handleDirtyChange}
          onSubmit={handleSubmit}
        />
      </WhiteContainer>
    </div>
  );
}
