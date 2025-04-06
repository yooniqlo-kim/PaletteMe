import { CommentCard } from "@/shared/components/comments/CommentCard";
import { BaseComment } from "@/shared/types/comment";
import { BaseArtwork } from "@/shared/types/artwork";

type CommentListViewProps = {
  comments: BaseComment[];
  artworks: Record<string, BaseArtwork>;
  onLikeChange?: (commentId: string, isLiked: boolean) => void;
};

export function CommentListView({
  comments,
  artworks,

  onLikeChange,
}: CommentListViewProps) {
  return (
    <div className="flex flex-col gap-4 items-center w-full px-4">
      {comments.map((comment) => {
        const artwork = artworks[comment.artworkId];
        return (
          <div key={comment.commentId} className="w-full max-w-screen-md">
          <CommentCard
            comment={comment}
            artworkImageUrl={artwork?.artworkImageUrl}
            variant="list"
            onLikeChange={onLikeChange}
          />
        </div>
        );
      })}
    </div>
  );
}
