import { BaseComment } from "@/shared/types/comment";
import { CommentCard } from "../../shared/components/comments/CommentCard";

type CommentBoxProps = {
  comments: BaseComment[];
  onLikeChange?: (commentId: string, isLiked: boolean) => void;
};

export function CommentBox({ comments, onLikeChange }: CommentBoxProps) {
  if (!comments || comments.length === 0)
    return (
      <div className="text-sm text-neutral-500 text-center py-6">
        아직 감상문이 없어요.
      </div>
    );
  return (
    <div className="space-y-4">
      <p className="text-md font-semibold text-neutral-700">
        감상문
        <span className="text-neutral-400 font-medium px-2">
          {comments.length}
        </span>
      </p>
      {comments.map((comment) => (
        <CommentCard
          key={comment.commentId}
          comment={comment}
          variant="detail"
          onLikeChange={onLikeChange}
        />
      ))}
    </div>
  );
}
