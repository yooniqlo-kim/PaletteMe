import { useLocation, useNavigate } from "react-router";
import { useState, useCallback } from "react";
import { ArtworkImage } from "@/features/detail/ArtworkImage";
import { WhiteContainer } from "@/shared/components/textbox/WhiteRoundedContainer";
import { WriteForm } from "@/features/write/WriteForm";
import Modal from "@/shared/components/modal/Modal";
import { useBlocker } from "react-router";
import { BaseArtwork } from "@/shared/types/artwork";
import { writeComment } from "@/shared/api/comment";
import { mapToBaseCommentFromWriteResponse } from "@/shared/utils/mapToBaseComment";
import { flushSync } from "react-dom";

export default function WritePage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isDirty, setIsDirty] = useState(false);
  const [isNavigatingInternally, setIsNavigatingInternally] = useState(false);

  const handleDirtyChange = useCallback((dirty: boolean) => {
    setIsDirty(dirty);
  }, []);

  const { state, reset, proceed } = useBlocker(
    isDirty && !isNavigatingInternally
  );
  const artwork = location.state?.artwork as BaseArtwork | undefined;

  if (!artwork) return <div>작품 정보를 불러올 수 없습니다.</div>;

  const handleSubmit = async ({
    content,
    visibility,
  }: {
    content: string;
    visibility: "public" | "private";
  }) => {
    try {
      const res = await writeComment({
        artworkId: artwork.artworkId,
        content,
        isPublic: visibility === "public",
      });

      const mappedComment = mapToBaseCommentFromWriteResponse(
        res,
        artwork.artworkId
      );

      flushSync(() => {
        setIsNavigatingInternally(true);
        setIsDirty(false);
      });

      setTimeout(() => {
        navigate(`/comments/${mappedComment.commentId}`, {
          state: { comment: mappedComment, artwork },
          replace: true,
        });
      }, 0);
    } catch (err) {
      console.error(err);
      alert("오류가 발생했습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100">
      {state === "blocked" && (
        <Modal
          open
          msg="작성 중인 감상문이 사라져요"
          confirmMsg="정말 나가시겠습니까?"
          onClose={reset}
          onConfirm={proceed}
        />
      )}

      <div className="pt-2 bg-neutral-200">
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
