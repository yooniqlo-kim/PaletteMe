import { useParams } from "react-router";
import { CommentDetail } from "@/features/comments/CommentDetail";
import { commentDummy } from "@/shared/dummy/commentDummy";
import { baseArtworkDummy } from "@/shared/dummy/artworkDummy";

export default function CommentDetailPage() {
  const { commentId } = useParams<{ commentId: string }>();

  const comment = commentDummy.find((c) => c.commentId === commentId);
  const artwork = baseArtworkDummy.find(
    (a) => a.artworkId === comment?.artworkId
  );
  if (!comment || !artwork) {
    return <div className="p-4 text-center">감상문을 찾을 수 없습니다.</div>;
  }

  return <CommentDetail comment={comment} artwork={artwork} />;
}
