import { useLocation, useNavigate } from "react-router";
import { useState, useCallback } from "react";
import { ArtworkImage } from "@/features/detail/ArtworkImage";
import { WhiteContainer } from "@/shared/components/textbox/WhiteRoundedContainer";
import { WriteForm } from "@/features/write/WriteForm";
import Modal from "@/shared/components/modal/Modal";
import { useBlocker } from "react-router";
import { BaseArtwork } from "@/shared/types/artwork";
import { postComment } from "@/shared/api/comment";
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
      const res = await postComment({
        artworkId: artwork.artworkId,
        content,
        isPublic: visibility === "public",
      });

      if (!res?.data) throw new Error("등록 실패");

      const mappedComment = mapToBaseCommentFromWriteResponse(
        res.data,
        artwork.artworkId
      );

      flushSync(() => {
        setIsNavigatingInternally(true);
        setIsDirty(false);
      });
      setTimeout(() => {
        navigate(`/comment/${mappedComment.commentId}`, {
          state: { comment: mappedComment, artwork },
        });
      }, 0);
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
          onClose={reset}
          onConfirm={proceed}
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
