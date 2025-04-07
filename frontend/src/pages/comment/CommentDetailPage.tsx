import { useParams, useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { getCommentDetail } from "@/shared/api/comment";
import { mapToCommentAndArtwork } from "@/shared/utils/mapToBaseComment";
import { CommentDetail } from "@/features/comments/CommentDetail";
import { BaseComment } from "@/shared/types/comment";
import { ArtworkPreview } from "@/shared/types/artwork";
import { ArtworkDetailSkeleton } from "@/features/detail/ArtworkDetailSkeleton";

export default function CommentDetailPage() {
  const { commentId } = useParams<{ commentId: string }>();
  const location = useLocation();
  const state = location.state as {
    comment?: BaseComment;
    artwork?: ArtworkPreview;
  };
  const navigate = useNavigate();

  const [comment, setComment] = useState<BaseComment | null>(null);
  const [artwork, setArtwork] = useState<ArtworkPreview | null>(null);

  useEffect(() => {
    // location.state에 comment, artwork 둘 다 있으면 바로 세팅
    if (state?.comment && state?.artwork) {  
      setComment(state.comment);
      setArtwork(state.artwork);
      return;
    }

    if (!commentId) {
      navigate("/not-found", { replace: true });
      return;
    }
    const fetch = async () => {
      try {
        const res = await getCommentDetail(commentId);
        const { comment, artwork } = mapToCommentAndArtwork(res, commentId);
        setComment(comment);
        setArtwork(artwork);
      } catch (e) {
        console.error("감상문 상세 조회 실패", e);
        navigate("/not-found", { replace: true }); 
      }
    };
    fetch();
  }, [commentId, state]);

  if (!comment || !artwork) {
    return <ArtworkDetailSkeleton/>;
  }

  return <CommentDetail comment={comment} artwork={artwork} />;
}
