import { useState, useCallback } from "react";
import { ArtworkImage } from "@/features/detail/ArtworkImage";
import { WhiteContainer } from "@/shared/components/textbox/WhiteRoundedContainer";
import { artworkDummy } from "@/shared/dummy/artworkDummy";
import { WriteForm } from "@/features/write/WriteForm";
import Modal from "@/shared/components/modal/Modal";
import { useBlocker } from "react-router";

export default function WritePage() {
  const [isDirty, setIsDirty] = useState(false);
  const handleDirtyChange = useCallback((dirty: boolean) => {
    setIsDirty(dirty);
  }, []);

  const { state, reset, proceed } = useBlocker(isDirty);

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
        <ArtworkImage artwork={artworkDummy} />
      </div>

      <WhiteContainer withTopRound withMarginTop>
        <WriteForm onDirtyChange={handleDirtyChange} />
      </WhiteContainer>
    </div>
  );
}
