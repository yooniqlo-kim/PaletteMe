import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";

import { ArtworkImage } from "@/features/detail/ArtworkImage";
import { WhiteContainer } from "@/shared/components/textbox/WhiteRoundedContainer";
import { WriteForm } from "@/features/write/WriteForm";
import Modal from "@/shared/components/modal/Modal";
import { useBlocker } from "react-router";

import { baseArtworkDummy } from "@/shared/dummy/artworkDummy"; // 실제 API로 교체해야 함
import { BaseComment } from "@/shared/types/comment";
import { commentDummy } from "@/shared/dummy/commentDummy";

export default function CommentEditPage() {
  const { commentId } = useParams<{ commentId: string }>();
  const [comment, setComment] = useState<BaseComment | null>(null);
  const [isDirty, setIsDirty] = useState(false);

  const { state, reset, proceed } = useBlocker(isDirty);

  const handleDirtyChange = useCallback((dirty: boolean) => {
    setIsDirty(dirty);
  }, []);

  useEffect(() => {
    // API 대신 dummy에서 commentId로 찾기
    const matched = commentDummy.find((c) => c.commentId === commentId);
    if (matched) {
      setComment(matched);
    } else {
      alert("해당 감상문을 찾을 수 없습니다.");
    }
  }, [commentId]);

  const handleSubmit = async ({
    content,
    visibility,
  }: Pick<BaseComment, "content" | "visibility">) => {
    alert(`수정 완료!\n\n내용: ${content}\n공개 설정: ${visibility}`);
    // 실제로는 PUT 요청이 들어갈 자리
  };

  if (!comment) return <div className="p-4">감상문을 불러오는 중...</div>;

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
        <ArtworkImage artwork={baseArtworkDummy} />
      </div>

      <WhiteContainer withTopRound withMarginTop>
        <WriteForm
          initialValues={comment}
          onDirtyChange={handleDirtyChange}
          onSubmit={handleSubmit}
        />
      </WhiteContainer>
    </div>
  );
}
