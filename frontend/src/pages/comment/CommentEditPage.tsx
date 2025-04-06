import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { flushSync } from "react-dom";
import { ArtworkImage } from "@/features/detail/ArtworkImage";
import { WhiteContainer } from "@/shared/components/textbox/WhiteRoundedContainer";
import { WriteForm } from "@/features/write/WriteForm";
import Modal from "@/shared/components/modal/Modal";
import { useBlocker } from "react-router";
import { ArtworkDetailSkeleton } from "@/features/detail/ArtworkDetailSkeleton";
import { getCommentDetail, editComment } from "@/shared/api/comment";
import { mapToCommentAndArtwork } from "@/shared/utils/mapToBaseComment";
import { BaseComment } from "@/shared/types/comment";
import { ArtworkPreview } from "@/shared/types/artwork";


export default function CommentEditPage() {
  const { commentId } = useParams<{ commentId: string }>();
  const navigate = useNavigate();

  const [comment, setComment] = useState<BaseComment | null>(null);
  const [artwork, setArtwork] = useState<ArtworkPreview | null>(null);
  const [isDirty, setIsDirty] = useState(false);

  const { state, reset, proceed } = useBlocker(isDirty);

  const handleDirtyChange = useCallback((dirty: boolean) => {
    setIsDirty(dirty);
  }, []);

  useEffect(() => {
    if (!commentId) return;

    const fetch = async () => {
      try {
        const res = await getCommentDetail(commentId);
        const { comment, artwork } = mapToCommentAndArtwork(res, commentId);
        setComment(comment);
        setArtwork(artwork);
      } catch (e) {
        console.error("감상문 상세 조회 실패", e);
        alert("감상문 정보를 불러오는 데 실패했습니다.");
      }
    };

    fetch();
  }, [commentId]);

  if (!comment || !artwork) {
    return <ArtworkDetailSkeleton/>;
  }

  const handleSubmit = async ({
    content,
    visibility,
  }: Pick<BaseComment, "content" | "visibility">) => {
    try {
      await editComment(commentId!, {
        content,
        isPublic: visibility === "public",
      });

      flushSync(() => {
        setIsDirty(false);
      });
  
      navigate(`/comments/${commentId}`);
    } catch (err) {
      console.error("수정 실패", err);
      alert("감상문 수정 중 오류가 발생했습니다.");
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
          initialValues={comment}
          onDirtyChange={handleDirtyChange}
          onSubmit={handleSubmit} 
          artwork={artwork}
        />
      </WhiteContainer>
    </div>
  );
}
