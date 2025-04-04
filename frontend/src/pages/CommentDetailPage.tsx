import { useParams, useLocation } from "react-router";
import { useEffect, useState } from "react";
import { getCommentDetail } from "@/shared/api/comment";
import { mapToCommentAndArtwork } from "@/shared/utils/mapToBaseComment";
import { CommentDetail } from "@/features/comments/CommentDetail";
import { BaseComment } from "@/shared/types/comment";
import { ArtworkDetailData } from "@/shared/types/artwork";

export default function CommentDetailPage() {
  const { commentId } = useParams<{ commentId: string }>();
  const location = useLocation();
  const state = location.state as {
    comment?: BaseComment;
    artwork?: ArtworkDetailData;
  }; // 적절한 타입 지정

  const [comment, setComment] = useState<BaseComment | null>(null);
  const [artwork, setArtwork] = useState<ArtworkDetailData | null>(null);

  useEffect(() => {
    // location.state에 comment, artwork 둘 다 있으면 바로 세팅
    if (state?.comment && state?.artwork) {
      setComment(state.comment);
      setArtwork(state.artwork);
      return;
    }

    if (!commentId) return;

    const fetch = async () => {
      try {
        const res = await getCommentDetail(commentId);
        const { comment, artwork } = mapToCommentAndArtwork(res);
        setComment(comment);
        setArtwork(artwork);
      } catch (e) {
        console.error("감상문 상세 조회 실패", e);
      }
    };

    fetch();
  }, [commentId, state]);

  if (!comment || !artwork) {
    return <div className="p-4 text-center">감상문을 불러오는 중입니다...</div>;
  }

  return <CommentDetail comment={comment} artwork={artwork} />;
}
